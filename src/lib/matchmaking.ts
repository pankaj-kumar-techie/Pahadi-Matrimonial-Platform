import { prisma } from "./prisma";

export async function getCompatibilityScore(userA: any, userB: any) {
  let score = 0;

  // 40% District Match
  if (userA.district === userB.district) {
    score += 40;
  } else {
    // Check adjacent districts (Mock logic for now, in prod use a mapping)
    score += 20;
  }

  // 30% Community Match
  if (userA.community === userB.community) {
    score += 30;
  }

  // 30% Age Proximity
  const ageA = calculateAge(userA.dob);
  const ageB = calculateAge(userB.dob);
  const ageDiff = Math.abs(ageA - ageB);
  
  if (ageDiff <= 3) score += 30;
  else if (ageDiff <= 5) score += 20;
  else if (ageDiff <= 10) score += 10;

  return score;
}

function calculateAge(dob: Date | string) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export async function getCuratedMatches(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return [];

  const oppositeGender = user.gender === "Male" ? "Female" : "Male";

  // Find users of opposite gender who are not already matched/interested
  const potentialMatches = await prisma.user.findMany({
    where: {
      gender: oppositeGender,
      id: { not: userId },
      verificationStatus: "VERIFIED",
    },
    take: 20, // Fetch a pool to score
  });

  const scoredMatches = await Promise.all(
    potentialMatches.map(async (other: typeof user) => {
      const score = await getCompatibilityScore(user, other);
      return { ...other, compatibilityScore: score };
    })
  );

  // Sort by score and take top 5
  return scoredMatches.sort((a: { compatibilityScore: number }, b: { compatibilityScore: number }) => b.compatibilityScore - a.compatibilityScore).slice(0, 5);
}
