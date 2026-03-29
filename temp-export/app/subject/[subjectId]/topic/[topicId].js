"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStaticParams = generateStaticParams;
exports.default = TopicScreen;
const react_1 = require("react");
const expo_router_1 = require("expo-router");
const react_native_1 = require("react-native");
const AppShell_1 = require("@/components/AppShell");
const LearningUnitCard_1 = require("@/components/LearningUnitCard");
const RecommendedActionCard_1 = require("@/components/RecommendedActionCard");
const SearchBar_1 = require("@/components/SearchBar");
const SectionHeader_1 = require("@/components/SectionHeader");
const use_app_theme_1 = require("@/hooks/use-app-theme");
const use_breakpoints_1 = require("@/hooks/use-breakpoints");
const catalog_1 = require("@/content/catalog");
const selectors_1 = require("@/features/learning/selectors");
const unit_search_1 = require("@/features/learning/unit-search");
const use_study_1 = require("@/hooks/use-study");
const element_accents_1 = require("@/theme/element-accents");
const routes_1 = require("@/utils/routes");
const static_params_1 = require("@/utils/static-params");
const format_1 = require("@/utils/format");
function generateStaticParams() {
    return (0, static_params_1.getTopicStaticParams)();
}
function TopicScreen() {
    const { subjectId, topicId } = (0, expo_router_1.useLocalSearchParams)();
    const subject = (0, catalog_1.getSubjectById)(subjectId);
    const topic = (0, catalog_1.getTopicById)(subjectId, topicId);
    const theme = (0, use_app_theme_1.useAppTheme)();
    const { isDesktop, isTablet } = (0, use_breakpoints_1.useBreakpoints)();
    const router = (0, expo_router_1.useRouter)();
    const { progress } = (0, use_study_1.useStudy)();
    const [query, setQuery] = (0, react_1.useState)('');
    const [debouncedQuery, setDebouncedQuery] = (0, react_1.useState)('');
    const [statusFilter, setStatusFilter] = (0, react_1.useState)('all');
    (0, react_1.useEffect)(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query);
        }, 120);
        return () => clearTimeout(timeout);
    }, [query]);
    const searchState = (0, react_1.useMemo)(() => (0, unit_search_1.rankLearningUnits)(topic?.learningUnits ?? [], debouncedQuery, 8), [debouncedQuery, topic?.learningUnits]);
    if (!subject || !topic) {
        return (<AppShell_1.AppShell>
        <react_native_1.Text style={{ color: theme.colors.text }}>Topic not found.</react_native_1.Text>
      </AppShell_1.AppShell>);
    }
    const isSearching = debouncedQuery.trim().length > 0;
    const topicRecommendation = (0, selectors_1.getRecommendedActionForTopic)(progress, subject, topic);
    const recommendedUnit = (0, catalog_1.getUnitById)(subject.id, topic.id, topicRecommendation.unitId);
    const recommendedChapter = (0, catalog_1.getChapterById)(subject.id, topic.id, topicRecommendation.unitId, topicRecommendation.chapterId);
    const recommendedAccent = (0, element_accents_1.getElementAccentPalette)(recommendedUnit?.id, theme);
    const matchMap = new Map(searchState.results.map((result) => [result.unit.id, result]));
    const queryUnits = isSearching
        ? searchState.results.map((result) => result.unit)
        : topic.learningUnits;
    const filteredUnits = queryUnits.filter((unit) => {
        switch (statusFilter) {
            case 'completed':
                return (0, selectors_1.getUnitStudyStatus)(progress, unit) === 'completed';
            case 'in-progress':
                return (0, selectors_1.getUnitStudyStatus)(progress, unit) === 'in-progress';
            case 'not-started':
                return (0, selectors_1.getUnitStudyStatus)(progress, unit) === 'not-started';
            case 'needs-review':
                return (0, selectors_1.getUnitStudyStatus)(progress, unit) === 'needs-review';
            case 'bookmarked':
                return (0, selectors_1.isUnitBookmarked)(progress, unit);
            default:
                return true;
        }
    });
    const unitSearchPlaceholder = topic.id === 'elements'
        ? 'Search by element name, symbol, or keyword'
        : 'Search by unit title or keyword';
    const emptyStateTitle = isSearching
        ? topic.id === 'elements'
            ? 'No elements match that search.'
            : 'No units match that search.'
        : statusFilter === 'all'
            ? 'No units are available.'
            : `No ${statusFilter.replace('-', ' ')} units right now.`;
    const emptyStateDescription = isSearching
        ? topic.id === 'elements'
            ? 'Try a full name such as Oxygen, a symbol such as O, or a keyword such as noble gas.'
            : `Try a full unit title such as ${topic.learningUnits[0]?.title ?? topic.title} or a keyword tied to the topic.`
        : statusFilter === 'all'
            ? 'This topic does not currently contain seeded units.'
            : 'Try a different progress filter or continue studying this topic to change the results.';
    const sectionDescription = isSearching
        ? searchState.results.length === 0
            ? `No matches found for "${debouncedQuery.trim()}". Try a full title, a symbol, or a concise keyword.`
            : searchState.showingFallback
                ? `No strong matches found for "${debouncedQuery.trim()}". Showing the closest ${(0, format_1.formatCount)(searchState.results.length, 'result')}.`
                : `Showing ${(0, format_1.formatCount)(searchState.results.length, 'ranked result')}${searchState.limited ? ' from the strongest matches' : ''} for "${debouncedQuery.trim()}".`
        : statusFilter === 'all'
            ? 'Each unit opens as a small scientific book with chapter reading, glossary context, flashcards, quizzes, bookmarks, and local progress.'
            : `Showing ${statusFilter.replace('-', ' ')} units within this topic.`;
    const cardWidth = isDesktop ? '31.8%' : isTablet ? '48%' : '100%';
    const hero = (<react_native_1.View style={{
            overflow: 'hidden',
            gap: theme.spacing.lg,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: theme.colors.borderStrong,
            backgroundColor: theme.colors.surfaceContrast,
            padding: theme.spacing.xxl,
        }}>
      <react_native_1.View style={{
            position: 'absolute',
            right: -30,
            top: -20,
            width: 220,
            height: 220,
            borderRadius: 110,
            backgroundColor: theme.colors.accentGlow,
        }}/>
      <react_native_1.Text style={{
            color: theme.colors.textInverse,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1.1,
            textTransform: 'uppercase',
        }}>
        Topic
      </react_native_1.Text>
      <react_native_1.Text style={{
            color: theme.colors.textInverse,
            fontFamily: theme.fonts.display,
            fontSize: 54,
            fontWeight: '700',
        }}>
        {topic.title}
      </react_native_1.Text>
      <react_native_1.Text style={{
            maxWidth: 860,
            color: 'rgba(248, 247, 243, 0.82)',
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.bodyLarge,
            lineHeight: 30,
        }}>
        {topic.description}
      </react_native_1.Text>

      <react_native_1.View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
        }}>
        {topic.learningUnits.slice(0, 10).map((unit) => {
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

      <SearchBar_1.SearchBar value={query} onChangeText={setQuery} placeholder={unitSearchPlaceholder} variant="inverse"/>
    </react_native_1.View>);
    return (<AppShell_1.AppShell hero={hero} breadcrumbs={[
            { label: 'Home', href: (0, routes_1.homeRoute)() },
            { label: subject.title, href: (0, routes_1.subjectRoute)(subject.id) },
            { label: topic.title },
        ]}>
      <react_native_1.View style={{ gap: theme.spacing.md }}>
        <SectionHeader_1.SectionHeader eyebrow="Collection" title={`${topic.title} library`} description={sectionDescription}/>

        {recommendedUnit && recommendedChapter ? (<RecommendedActionCard_1.RecommendedActionCard eyebrow={topicRecommendation.isStartHere ? 'Start Here' : 'Recommended Next'} title={`${recommendedUnit.shortTitle} • ${recommendedUnit.title}`} description={`${topicRecommendation.reason} ${recommendedChapter.overview}`} ctaLabel={topicRecommendation.isStartHere ? 'Start Chapter' : 'Continue Chapter'} onPress={() => router.push((0, routes_1.chapterRoute)(subject.id, topic.id, topicRecommendation.unitId, topicRecommendation.chapterId))} tags={[
                recommendedChapter.title,
                topicRecommendation.prerequisiteLabel ?? 'Topic sequence',
            ]} accent={recommendedAccent}/>) : null}

        <react_native_1.View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
        }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'needs-review', label: 'Needs Review' },
            { id: 'completed', label: 'Completed' },
            { id: 'not-started', label: 'Not Started' },
            { id: 'bookmarked', label: 'Bookmarked' },
        ].map((filter) => {
            const active = statusFilter === filter.id;
            return (<react_native_1.Pressable key={filter.id} accessibilityRole="button" onPress={() => setStatusFilter(filter.id)} style={({ pressed }) => ({
                    borderRadius: theme.radius.pill,
                    borderWidth: 1,
                    borderColor: active ? theme.colors.borderStrong : theme.colors.border,
                    backgroundColor: active ? theme.colors.surfaceElevated : theme.colors.surfaceOverlay,
                    paddingHorizontal: theme.spacing.md,
                    paddingVertical: theme.spacing.sm,
                    opacity: pressed ? 0.88 : 1,
                })}>
                <react_native_1.Text style={{
                    color: active ? theme.colors.text : theme.colors.textMuted,
                    fontFamily: theme.fonts.mono,
                    fontSize: 11,
                    fontWeight: '700',
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                }}>
                  {filter.label}
                </react_native_1.Text>
              </react_native_1.Pressable>);
        })}
        </react_native_1.View>

        {isSearching && searchState.results.length > 0 ? (<react_native_1.View style={{
                gap: theme.spacing.xs,
                borderRadius: theme.radius.lg,
                borderWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surfaceElevated,
                paddingHorizontal: theme.spacing.lg,
                paddingVertical: theme.spacing.md,
            }}>
            <react_native_1.Text style={{
                color: theme.colors.textSoft,
                fontFamily: theme.fonts.mono,
                fontSize: 11,
                fontWeight: '700',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
            }}>
              Search results
            </react_native_1.Text>
            <react_native_1.Text style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: 14,
                lineHeight: 22,
            }}>
              {searchState.showingFallback
                ? 'These are the closest local matches from the current topic.'
                : searchState.limited
                    ? `Showing the top ${searchState.results.length} results to keep the list focused.`
                    : `Results are ranked by exact name and symbol matches first, then direct title matches, then contextual keyword matches.`}
            </react_native_1.Text>
          </react_native_1.View>) : null}

        {filteredUnits.length > 0 ? (<react_native_1.View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: theme.spacing.md,
            }}>
            {filteredUnits.map((unit) => {
                const unitProgress = (0, selectors_1.getUnitProgress)(progress, unit);
                return (<react_native_1.View key={unit.id} style={{ width: cardWidth }}>
                  <LearningUnitCard_1.LearningUnitCard unit={unit} progressPercentage={unitProgress.percentage} detail={`${unitProgress.completed} of ${unitProgress.total} chapters complete`} searchMatchLabel={isSearching ? matchMap.get(unit.id)?.matchLabel : undefined} href={(0, routes_1.unitRoute)(subject.id, topic.id, unit.id)} onPress={() => router.push((0, routes_1.unitRoute)(subject.id, topic.id, unit.id))}/>
                </react_native_1.View>);
            })}
          </react_native_1.View>) : (<react_native_1.View style={{
                gap: theme.spacing.sm,
                borderRadius: theme.radius.xl,
                borderWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surfaceElevated,
                padding: theme.spacing.xl,
            }}>
            <react_native_1.Text style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.display,
                fontSize: 28,
                fontWeight: '700',
            }}>
              {emptyStateTitle}
            </react_native_1.Text>
            <react_native_1.Text style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: theme.typography.body,
                lineHeight: 24,
            }}>
              {emptyStateDescription}
            </react_native_1.Text>
          </react_native_1.View>)}
      </react_native_1.View>
    </AppShell_1.AppShell>);
}
