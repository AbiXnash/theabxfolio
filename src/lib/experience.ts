export const PROGRAMMING_START_YEAR = 2022;
export const PROFESSIONAL_START = new Date(2025, 6, 1);

export function getProgrammingYears(now = new Date()) {
  return Math.max(0, now.getFullYear() - PROGRAMMING_START_YEAR);
}

export function getProfessionalMonths(now = new Date()) {
  if (now < PROFESSIONAL_START) return 0;

  let months =
    (now.getFullYear() - PROFESSIONAL_START.getFullYear()) * 12 +
    (now.getMonth() - PROFESSIONAL_START.getMonth());

  if (now.getDate() < PROFESSIONAL_START.getDate()) {
    months -= 1;
  }

  return Math.max(0, months);
}

function plural(count: number, singular: string, pluralForm: string) {
  return count === 1 ? singular : pluralForm;
}

export function formatProgrammingYears(now = new Date()) {
  const years = getProgrammingYears(now);
  return `${years} ${plural(years, "year", "years")}`;
}

export function formatProfessionalExperience(now = new Date()) {
  const months = getProfessionalMonths(now);
  const years = Math.floor(months / 12);
  const remainder = months % 12;

  if (years === 0) {
    const count = remainder || 1;
    return `${count} ${plural(count, "month", "months")}`;
  }

  if (remainder === 0) {
    return `${years} ${plural(years, "year", "years")}`;
  }

  return `${years} ${plural(years, "year", "years")}, ${remainder} ${plural(remainder, "month", "months")}`;
}

export function formatProgrammingShort(now = new Date()) {
  return `${getProgrammingYears(now)} yrs`;
}

export function formatProfessionalShort(now = new Date()) {
  const months = getProfessionalMonths(now);
  const years = Math.floor(months / 12);
  const remainder = months % 12;

  if (years === 0) return `${remainder} mo`;
  if (remainder === 0) return `${years} yr`;
  return `${years}y ${remainder}m`;
}

export interface HeroExperienceStat {
  value: string;
  title: string;
  range: string;
}

export function getHeroExperience(now = new Date()) {
  const currentYear = now.getFullYear();
  const programmingYears = getProgrammingYears(now);
  const professionalMonths = getProfessionalMonths(now);
  const professionalYears = Math.floor(professionalMonths / 12);
  const professionalRemainder = professionalMonths % 12;

  let professionalValue: string;
  if (professionalMonths < 12) {
    const count = professionalMonths || 1;
    professionalValue = `${count} ${plural(count, "month", "months")}`;
  } else if (professionalRemainder === 0) {
    professionalValue = `${professionalYears} ${plural(professionalYears, "year", "years")}`;
  } else {
    professionalValue = `${professionalYears} ${plural(professionalYears, "year", "years")}, ${professionalRemainder} ${plural(professionalRemainder, "month", "months")}`;
  }

  return {
    programming: {
      value: `${programmingYears} ${plural(programmingYears, "year", "years")}`,
      title: "Programming",
      range: `${PROGRAMMING_START_YEAR}–${currentYear}`,
    },
    professional: {
      value: professionalValue,
      title: "Professional",
      range: `Jul ${PROFESSIONAL_START.getFullYear()}–${currentYear}`,
    },
  } satisfies Record<string, HeroExperienceStat>;
}