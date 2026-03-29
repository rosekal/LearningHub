import { agricultureSoilScienceAccentSources, agricultureSoilScienceSubject, agricultureSoilScienceUnits } from '@/content/subjects/agriculture-soil-science';
import { astronomyAccentSources, astronomySubject, astronomyUnits } from '@/content/subjects/astronomy';
import { biologyAccentSources, biologySubject, biologyUnits } from '@/content/subjects/biology';
import { botanyAccentSources, botanySubject, botanyUnits } from '@/content/subjects/botany';
import { chemistrySubject, chemistryUnits } from '@/content/subjects/chemistry';
import { chemistryConceptAccentSources } from '@/content/subjects/chemistry/conceptTopics';
import { computerScienceAccentSources, computerScienceSubject, computerScienceUnits } from '@/content/subjects/computer-science';
import { economicsResourceEnvironmentalAccentSources, economicsResourceEnvironmentalSubject, economicsResourceEnvironmentalUnits } from '@/content/subjects/economics-resource-environmental';
import { energyScienceAccentSources, energyScienceSubject, energyScienceUnits } from '@/content/subjects/energy-science';
import { geochemistryAccentSources, geochemistrySubject, geochemistryUnits } from '@/content/subjects/geochemistry';
import { geographyAccentSources, geographySubject, geographyUnits } from '@/content/subjects/geography';
import { geologySubject, geologyUnits } from '@/content/subjects/geology';
import { geologyAccentSources } from '@/content/subjects/geology/topics';
import { geophysicsAccentSources, geophysicsSubject, geophysicsUnits } from '@/content/subjects/geophysics';
import { machineLearningAiAccentSources, machineLearningAiSubject, machineLearningAiUnits } from '@/content/subjects/machine-learning-ai';
import { mathematicsAccentSources, mathematicsSubject, mathematicsUnits } from '@/content/subjects/mathematics';
import { meteorologyAccentSources, meteorologySubject, meteorologyUnits } from '@/content/subjects/meteorology';
import { oceanographyAccentSources, oceanographySubject, oceanographyUnits } from '@/content/subjects/oceanography';
import { operationsResearchSystemsScienceAccentSources, operationsResearchSystemsScienceSubject, operationsResearchSystemsScienceUnits } from '@/content/subjects/operations-research-systems-science';
import { pharmacologyMedicinalChemistryAccentSources, pharmacologyMedicinalChemistrySubject, pharmacologyMedicinalChemistryUnits } from '@/content/subjects/pharmacology-medicinal-chemistry';
import { physicsAccentSources, physicsSubject, physicsUnits } from '@/content/subjects/physics';
import type { LearningUnit, Subject } from '@/content/schema';

export interface SubjectRegistryEntry {
  id: string;
  loadSync: () => {
    subject: Subject;
    units: LearningUnit[];
  };
}

export const subjectAccentSources = {
  ...chemistryConceptAccentSources,
  ...geologyAccentSources,
  ...physicsAccentSources,
  ...biologyAccentSources,
  ...mathematicsAccentSources,
  ...astronomyAccentSources,
  ...geographyAccentSources,
  ...oceanographyAccentSources,
  ...meteorologyAccentSources,
  ...geophysicsAccentSources,
  ...geochemistryAccentSources,
  ...computerScienceAccentSources,
  ...machineLearningAiAccentSources,
  ...pharmacologyMedicinalChemistryAccentSources,
  ...agricultureSoilScienceAccentSources,
  ...energyScienceAccentSources,
  ...economicsResourceEnvironmentalAccentSources,
  ...operationsResearchSystemsScienceAccentSources,
  ...botanyAccentSources,
} as const satisfies Record<string, string>;

export const subjectRegistry: SubjectRegistryEntry[] = [
  {
    id: 'chemistry',
    loadSync: () => ({ subject: chemistrySubject, units: chemistryUnits }),
  },
  {
    id: 'geology',
    loadSync: () => ({ subject: geologySubject, units: geologyUnits }),
  },
  {
    id: 'physics',
    loadSync: () => ({ subject: physicsSubject, units: physicsUnits }),
  },
  {
    id: 'biology',
    loadSync: () => ({ subject: biologySubject, units: biologyUnits }),
  },
  {
    id: 'mathematics',
    loadSync: () => ({ subject: mathematicsSubject, units: mathematicsUnits }),
  },
  {
    id: 'astronomy-astrophysics',
    loadSync: () => ({ subject: astronomySubject, units: astronomyUnits }),
  },
  {
    id: 'geography',
    loadSync: () => ({ subject: geographySubject, units: geographyUnits }),
  },
  {
    id: 'oceanography',
    loadSync: () => ({ subject: oceanographySubject, units: oceanographyUnits }),
  },
  {
    id: 'meteorology',
    loadSync: () => ({ subject: meteorologySubject, units: meteorologyUnits }),
  },
  {
    id: 'geophysics',
    loadSync: () => ({ subject: geophysicsSubject, units: geophysicsUnits }),
  },
  {
    id: 'geochemistry',
    loadSync: () => ({ subject: geochemistrySubject, units: geochemistryUnits }),
  },
  {
    id: 'computer-science',
    loadSync: () => ({ subject: computerScienceSubject, units: computerScienceUnits }),
  },
  {
    id: 'machine-learning-ai',
    loadSync: () => ({ subject: machineLearningAiSubject, units: machineLearningAiUnits }),
  },
  {
    id: 'pharmacology-medicinal-chemistry',
    loadSync: () => ({
      subject: pharmacologyMedicinalChemistrySubject,
      units: pharmacologyMedicinalChemistryUnits,
    }),
  },
  {
    id: 'agriculture-soil-science',
    loadSync: () => ({ subject: agricultureSoilScienceSubject, units: agricultureSoilScienceUnits }),
  },
  {
    id: 'energy-science',
    loadSync: () => ({ subject: energyScienceSubject, units: energyScienceUnits }),
  },
  {
    id: 'economics-resource-environmental',
    loadSync: () => ({
      subject: economicsResourceEnvironmentalSubject,
      units: economicsResourceEnvironmentalUnits,
    }),
  },
  {
    id: 'operations-research-systems-science',
    loadSync: () => ({
      subject: operationsResearchSystemsScienceSubject,
      units: operationsResearchSystemsScienceUnits,
    }),
  },
  {
    id: 'botany',
    loadSync: () => ({ subject: botanySubject, units: botanyUnits }),
  },
];
