"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomeScreen;
const react_1 = require("react");
const expo_router_1 = require("expo-router");
const react_native_1 = require("react-native");
const AppShell_1 = require("@/components/AppShell");
const Button_1 = require("@/components/Button");
const LearningUnitCard_1 = require("@/components/LearningUnitCard");
const RecommendedActionCard_1 = require("@/components/RecommendedActionCard");
const SearchBar_1 = require("@/components/SearchBar");
const SectionHeader_1 = require("@/components/SectionHeader");
const SubjectCard_1 = require("@/components/SubjectCard");
const use_app_theme_1 = require("@/hooks/use-app-theme");
const use_breakpoints_1 = require("@/hooks/use-breakpoints");
const use_study_1 = require("@/hooks/use-study");
const catalog_1 = require("@/content/catalog");
const selectors_1 = require("@/features/learning/selectors");
const unit_search_1 = require("@/features/learning/unit-search");
const element_accents_1 = require("@/theme/element-accents");
const format_1 = require("@/utils/format");
const routes_1 = require("@/utils/routes");
function HomeScreen() {
    const theme = (0, use_app_theme_1.useAppTheme)();
    const { isDesktop, isTablet } = (0, use_breakpoints_1.useBreakpoints)();
    const router = (0, expo_router_1.useRouter)();
    const { progress } = (0, use_study_1.useStudy)();
    const [query, setQuery] = (0, react_1.useState)('');
    const [debouncedQuery, setDebouncedQuery] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query);
        }, 120);
        return () => clearTimeout(timeout);
    }, [query]);
    const featuredSubject = catalog_1.subjects[0];
    const continueState = (0, selectors_1.getContinueLearningState)(progress, catalog_1.subjects);
    const libraryRecommendation = (0, selectors_1.getRecommendedActionForLibrary)(progress, catalog_1.subjects);
    const continueUnit = continueState
        ? (0, catalog_1.getUnitById)(continueState.subjectId, continueState.topicId, continueState.unitId)
        : undefined;
    const continueChapter = continueState
        ? (0, catalog_1.getChapterById)(continueState.subjectId, continueState.topicId, continueState.unitId, continueState.chapterId)
        : undefined;
    const recommendedSubject = libraryRecommendation
        ? (0, catalog_1.getSubjectById)(libraryRecommendation.subjectId)
        : undefined;
    const recommendedTopic = libraryRecommendation
        ? (0, catalog_1.getTopicById)(libraryRecommendation.subjectId, libraryRecommendation.topicId)
        : undefined;
    const recommendedUnit = libraryRecommendation
        ? (0, catalog_1.getUnitById)(libraryRecommendation.subjectId, libraryRecommendation.topicId, libraryRecommendation.unitId)
        : undefined;
    const recommendedChapter = libraryRecommendation
        ? (0, catalog_1.getChapterById)(libraryRecommendation.subjectId, libraryRecommendation.topicId, libraryRecommendation.unitId, libraryRecommendation.chapterId)
        : undefined;
    const recommendedAccent = (0, element_accents_1.getElementAccentPalette)(recommendedUnit?.id, theme);
    const globalSearchState = (0, react_1.useMemo)(() => (0, unit_search_1.rankLearningUnits)(catalog_1.learningUnits, debouncedQuery, 8), [debouncedQuery]);
    const isSearching = debouncedQuery.trim().length > 0;
    const featuredUnits = catalog_1.subjects
        .flatMap((subject) => subject.topics[0]?.learningUnits.slice(0, 1) ?? [])
        .slice(0, 5);
    const subjectEntries = catalog_1.subjects.map((subject) => {
        const subjectProgress = (0, selectors_1.getSubjectProgress)(progress, subject);
        const subjectUnits = subject.topics.reduce((count, topic) => count + topic.learningUnits.length, 0);
        const subjectChapters = subject.topics.reduce((count, topic) => count + topic.learningUnits.reduce((unitCount, unit) => unitCount + unit.chapters.length, 0), 0);
        return {
            subject,
            subjectProgress,
            detail: `${subjectProgress.completed} of ${subjectProgress.total} chapters completed`,
            stats: [
                (0, format_1.formatCount)(subject.topics.length, 'topic'),
                (0, format_1.formatCount)(subjectUnits, 'unit'),
                (0, format_1.formatCount)(subjectChapters, 'chapter reading'),
            ],
        };
    });
    const featuredSubjects = subjectEntries.slice(0, isTablet ? 2 : 1);
    const catalogSubjects = subjectEntries.slice(featuredSubjects.length);
    const hero = (<react_native_1.View style={{
            flexDirection: isDesktop ? 'row' : 'column',
            gap: theme.spacing.lg,
        }}>
      <react_native_1.View style={{
            flex: 1.45,
            overflow: 'hidden',
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: theme.colors.borderStrong,
            backgroundColor: theme.colors.surfaceContrast,
            padding: theme.spacing.xxl,
            ...theme.shadow.strong,
        }}>
        <react_native_1.View style={{
            position: 'absolute',
            top: -40,
            right: -20,
            width: 220,
            height: 220,
            borderRadius: 110,
            backgroundColor: theme.colors.accentGlow,
        }}/>
        <react_native_1.View style={{ gap: theme.spacing.lg }}>
          <react_native_1.View style={{
            alignSelf: 'flex-start',
            borderRadius: theme.radius.pill,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.22)',
            backgroundColor: 'rgba(255,255,255,0.06)',
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: 6,
        }}>
            <react_native_1.Text style={{
            color: theme.colors.textInverse,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
              LearnHub
            </react_native_1.Text>
          </react_native_1.View>

          <react_native_1.View style={{ gap: theme.spacing.md }}>
            <react_native_1.Text style={{
            maxWidth: 760,
            color: theme.colors.textInverse,
            fontFamily: theme.fonts.display,
            fontSize: isDesktop ? 64 : 46,
            fontWeight: '700',
            lineHeight: isDesktop ? 70 : 52,
        }}>
              Study like a modern scientific atlas, not a stack of disconnected notes.
            </react_native_1.Text>
            <react_native_1.Text style={{
            maxWidth: 720,
            color: 'rgba(248, 247, 243, 0.8)',
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.bodyLarge,
            lineHeight: 30,
        }}>
              LearnHub is a local-first reading and review platform built for serious study. The
              current library now spans multiple scientific and quantitative subjects, while the
              architecture continues to support subjects, topics, units, chapters, flashcards,
              quizzes, and persistent progress.
            </react_native_1.Text>
          </react_native_1.View>

          <react_native_1.View style={{
            flexDirection: isTablet ? 'row' : 'column',
            gap: theme.spacing.sm,
        }}>
            <Button_1.Button label={`Open ${featuredSubject.title}`} icon="flask-outline" onPress={() => router.push((0, routes_1.subjectRoute)(featuredSubject.id))} style={{ flex: isTablet ? 1 : undefined }}/>
            {continueState && continueUnit && continueChapter ? (<Button_1.Button label="Continue Learning" variant="secondary" icon="play-outline" onPress={() => router.push((0, routes_1.chapterRoute)(continueState.subjectId, continueState.topicId, continueState.unitId, continueState.chapterId))} style={{ flex: isTablet ? 1 : undefined }}/>) : null}
          </react_native_1.View>

          <react_native_1.View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
        }}>
            {featuredUnits.map((unit) => {
            const palette = (0, element_accents_1.getElementAccentPalette)(unit.id, theme);
            return (<react_native_1.View key={unit.id} style={{
                    borderRadius: theme.radius.pill,
                    borderWidth: 1,
                    borderColor: palette.line,
                    backgroundColor: palette.panel,
                    paddingHorizontal: theme.spacing.sm,
                    paddingVertical: 8,
                }}>
                  <react_native_1.Text style={{
                    color: palette.accentStrong,
                    fontFamily: theme.fonts.mono,
                    fontSize: 12,
                    fontWeight: '700',
                    letterSpacing: 0.7,
                    textTransform: 'uppercase',
                }}>
                    {unit.shortTitle}
                  </react_native_1.Text>
                </react_native_1.View>);
        })}
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>

      <react_native_1.View style={{
            flex: 1,
            gap: theme.spacing.lg,
        }}>
        <react_native_1.View style={{
            gap: theme.spacing.lg,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surfaceElevated,
            padding: theme.spacing.xl,
        }}>
          <react_native_1.View style={{ gap: theme.spacing.xs }}>
            <react_native_1.Text style={{
            color: theme.colors.accent,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
              Seeded Library
            </react_native_1.Text>
            <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: 32,
            fontWeight: '700',
        }}>
              Current library state
            </react_native_1.Text>
          </react_native_1.View>
          <react_native_1.Text style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.body,
            lineHeight: 26,
        }}>
            {`The current release now spans ${(0, format_1.formatCount)(catalog_1.catalogStats.subjects, 'subject')}, ${(0, format_1.formatCount)(catalog_1.catalogStats.topics, 'topic')}, ${(0, format_1.formatCount)(catalog_1.catalogStats.units, 'learning unit')}, and the same full study loop stored locally on the device.`}
          </react_native_1.Text>
          <react_native_1.View style={{ gap: theme.spacing.sm }}>
            {[
            (0, format_1.formatCount)(catalog_1.catalogStats.subjects, 'subject'),
            (0, format_1.formatCount)(catalog_1.catalogStats.topics, 'topic'),
            (0, format_1.formatCount)(catalog_1.catalogStats.units, 'learning unit'),
            (0, format_1.formatCount)(catalog_1.catalogStats.chapters, 'chapter'),
        ].map((item) => (<react_native_1.View key={item} style={{
                borderRadius: theme.radius.lg,
                borderWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surfaceOverlay,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.sm,
            }}>
                <react_native_1.Text style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.7,
                textTransform: 'uppercase',
            }}>
                  {item}
                </react_native_1.Text>
              </react_native_1.View>))}
          </react_native_1.View>
        </react_native_1.View>

        <react_native_1.View style={{
            gap: theme.spacing.md,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surfaceElevated,
            padding: theme.spacing.xl,
        }}>
          <react_native_1.Text style={{
            color: theme.colors.textSoft,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
            Study Model
          </react_native_1.Text>
          <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.reading,
            fontSize: 24,
            lineHeight: 34,
        }}>
            {'Home > Subject > Topic > Learning Unit > Chapter > Flashcards and Quiz'}
          </react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>);
    return (<AppShell_1.AppShell hero={hero}>
      {libraryRecommendation &&
            recommendedSubject &&
            recommendedTopic &&
            recommendedUnit &&
            recommendedChapter ? (<react_native_1.View style={{ gap: theme.spacing.md }}>
          <SectionHeader_1.SectionHeader eyebrow="Recommended Next" title={libraryRecommendation.isStartHere
                ? `Start with ${recommendedUnit.title}`
                : `Continue with ${recommendedUnit.title}`} description={libraryRecommendation.reason} accent={recommendedAccent}/>
          <RecommendedActionCard_1.RecommendedActionCard eyebrow={recommendedChapter.title} title={`${recommendedSubject.title} • ${recommendedTopic.title}`} description={`${recommendedChapter.overview} ${libraryRecommendation.prerequisiteLabel ? `${libraryRecommendation.prerequisiteLabel}.` : ''}`} ctaLabel={libraryRecommendation.isStartHere ? 'Start Chapter' : 'Resume Chapter'} onPress={() => router.push((0, routes_1.chapterRoute)(libraryRecommendation.subjectId, libraryRecommendation.topicId, libraryRecommendation.unitId, libraryRecommendation.chapterId))} tags={[
                recommendedUnit.shortTitle,
                recommendedTopic.title,
                libraryRecommendation.isStartHere ? 'Start Here' : 'Next Chapter',
            ]} accent={recommendedAccent}/>
        </react_native_1.View>) : null}

      <react_native_1.View style={{ gap: theme.spacing.md }}>
        <SectionHeader_1.SectionHeader eyebrow="Search" title="Find the next unit quickly" description={isSearching
            ? globalSearchState.results.length === 0
                ? `No strong local matches found for "${debouncedQuery.trim()}".`
                : globalSearchState.showingFallback
                    ? `Showing the closest local matches for "${debouncedQuery.trim()}".`
                    : `Showing ${(0, format_1.formatCount)(globalSearchState.results.length, 'ranked result')} across the full library.`
            : 'Search across all seeded subjects, topics, and units without leaving the home screen.'}/>
        <SearchBar_1.SearchBar value={query} onChangeText={setQuery} placeholder="Search the full library by unit title or keyword"/>
        {isSearching && globalSearchState.results.length > 0 ? (<react_native_1.View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: theme.spacing.md,
            }}>
            {globalSearchState.results.map((result) => {
                const resultSubject = (0, catalog_1.getSubjectById)(result.unit.subjectId);
                const resultTopic = (0, catalog_1.getTopicById)(result.unit.subjectId, result.unit.topicId);
                const unitProgress = (0, selectors_1.getUnitProgress)(progress, result.unit);
                if (!resultSubject || !resultTopic) {
                    return null;
                }
                return (<react_native_1.View key={result.unit.id} style={{ width: isDesktop ? '31.8%' : isTablet ? '48%' : '100%' }}>
                  <LearningUnitCard_1.LearningUnitCard unit={result.unit} progressPercentage={unitProgress.percentage} detail={`${resultSubject.title} • ${resultTopic.title}`} searchMatchLabel={result.matchLabel} href={(0, routes_1.unitRoute)(resultSubject.id, resultTopic.id, result.unit.id)} onPress={() => router.push((0, routes_1.unitRoute)(resultSubject.id, resultTopic.id, result.unit.id))}/>
                </react_native_1.View>);
            })}
          </react_native_1.View>) : null}
      </react_native_1.View>

      <react_native_1.View style={{ gap: theme.spacing.md }}>
        <SectionHeader_1.SectionHeader eyebrow="Subjects" title="Start from the library" description="The current interface now exposes multiple live subjects, and each one branches into topic-based study paths while the app model remains general-purpose and multi-subject-ready."/>
        <react_native_1.View style={{ gap: theme.spacing.lg }}>
          <react_native_1.View style={{
            flexDirection: isTablet ? 'row' : 'column',
            gap: theme.spacing.md,
        }}>
            {featuredSubjects.map(({ subject, subjectProgress, detail, stats }, index) => (<react_native_1.View key={subject.id} style={{ flex: 1 }}>
                <SubjectCard_1.SubjectCard subject={subject} progressPercentage={subjectProgress.percentage} detail={detail} href={(0, routes_1.subjectRoute)(subject.id)} stats={stats} eyebrow={index === 0 ? 'Featured Subject' : 'Curated Subject'} onPress={() => router.push((0, routes_1.subjectRoute)(subject.id))}/>
              </react_native_1.View>))}
          </react_native_1.View>

          {catalogSubjects.length > 0 ? (<react_native_1.View style={{
                gap: theme.spacing.lg,
                borderRadius: theme.radius.xl,
                borderWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surfaceOverlay,
                padding: isTablet ? theme.spacing.xl : theme.spacing.lg,
            }}>
              <react_native_1.View style={{
                flexDirection: isTablet ? 'row' : 'column',
                alignItems: isTablet ? 'center' : 'flex-start',
                justifyContent: 'space-between',
                gap: theme.spacing.sm,
            }}>
                <react_native_1.View style={{ gap: theme.spacing.xs }}>
                  <react_native_1.Text style={{
                color: theme.colors.teal,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 1,
                textTransform: 'uppercase',
            }}>
                    Browse All Subjects
                  </react_native_1.Text>
                  <react_native_1.Text style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.display,
                fontSize: isTablet ? 28 : 24,
                fontWeight: '700',
            }}>
                    Curated study catalog
                  </react_native_1.Text>
                </react_native_1.View>
                <react_native_1.Text style={{
                color: theme.colors.textSoft,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
            }}>
                  {(0, format_1.formatCount)(catalog_1.subjects.length, 'subject')}
                </react_native_1.Text>
              </react_native_1.View>

              <react_native_1.View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: theme.spacing.md,
            }}>
                {catalogSubjects.map(({ subject, subjectProgress, detail, stats }) => (<react_native_1.View key={subject.id} style={{ width: isDesktop ? '31.8%' : isTablet ? '48%' : '100%' }}>
                    <SubjectCard_1.SubjectCard subject={subject} progressPercentage={subjectProgress.percentage} detail={detail} href={(0, routes_1.subjectRoute)(subject.id)} stats={stats} variant="compact" onPress={() => router.push((0, routes_1.subjectRoute)(subject.id))}/>
                  </react_native_1.View>))}
              </react_native_1.View>
            </react_native_1.View>) : null}
        </react_native_1.View>
      </react_native_1.View>
    </AppShell_1.AppShell>);
}
