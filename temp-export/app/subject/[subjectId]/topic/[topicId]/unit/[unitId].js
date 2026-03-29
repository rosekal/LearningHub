"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStaticParams = generateStaticParams;
exports.default = UnitScreen;
const expo_router_1 = require("expo-router");
const react_native_1 = require("react-native");
const AppShell_1 = require("@/components/AppShell");
const Button_1 = require("@/components/Button");
const ChapterCard_1 = require("@/components/ChapterCard");
const ResponsiveLayout_1 = require("@/components/ResponsiveLayout");
const SectionHeader_1 = require("@/components/SectionHeader");
const use_element_accent_1 = require("@/hooks/use-element-accent");
const use_app_theme_1 = require("@/hooks/use-app-theme");
const use_breakpoints_1 = require("@/hooks/use-breakpoints");
const catalog_1 = require("@/content/catalog");
const selectors_1 = require("@/features/learning/selectors");
const use_study_1 = require("@/hooks/use-study");
const routes_1 = require("@/utils/routes");
const static_params_1 = require("@/utils/static-params");
const format_1 = require("@/utils/format");
const responsive_1 = require("@/utils/responsive");
function generateStaticParams() {
    return (0, static_params_1.getUnitStaticParams)();
}
function UnitScreen() {
    const { subjectId, topicId, unitId } = (0, expo_router_1.useLocalSearchParams)();
    const subject = (0, catalog_1.getSubjectById)(subjectId);
    const topic = (0, catalog_1.getTopicById)(subjectId, topicId);
    const unit = (0, catalog_1.getUnitById)(subjectId, topicId, unitId);
    const theme = (0, use_app_theme_1.useAppTheme)();
    const router = (0, expo_router_1.useRouter)();
    const { progress } = (0, use_study_1.useStudy)();
    const accent = (0, use_element_accent_1.useElementAccent)(unit?.id);
    const { width, isTablet } = (0, use_breakpoints_1.useBreakpoints)();
    if (!subject || !topic || !unit) {
        return (<AppShell_1.AppShell>
        <react_native_1.Text style={{ color: theme.colors.text }}>Learning unit not found.</react_native_1.Text>
      </AppShell_1.AppShell>);
    }
    const unitProgress = (0, selectors_1.getUnitProgress)(progress, unit);
    const nextChapter = (0, selectors_1.getNextChapter)(unit, progress);
    const compact = !isTablet;
    const heroPadding = Math.round((0, responsive_1.interpolateByWidth)({
        width,
        minValue: theme.spacing.lg,
        maxValue: theme.spacing.xxl,
        minWidth: 320,
        maxWidth: 1100,
    }));
    const heroTitleSize = Math.round((0, responsive_1.interpolateByWidth)({
        width,
        minValue: 36,
        maxValue: 58,
        minWidth: 320,
        maxWidth: 1100,
    }));
    const heroOverviewSize = Math.round((0, responsive_1.interpolateByWidth)({
        width,
        minValue: theme.typography.body,
        maxValue: theme.typography.bodyLarge,
        minWidth: 320,
        maxWidth: 1100,
    }));
    const heroBadgeSize = Math.round((0, responsive_1.interpolateByWidth)({
        width,
        minValue: 70,
        maxValue: 92,
        minWidth: 320,
        maxWidth: 768,
    }));
    const heroBadgeTextSize = Math.round((0, responsive_1.interpolateByWidth)({
        width,
        minValue: 28,
        maxValue: 38,
        minWidth: 320,
        maxWidth: 768,
    }));
    const sidebar = (<react_native_1.View style={{ gap: theme.spacing.lg }}>
      <react_native_1.View style={{
            gap: theme.spacing.md,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: accent.line,
            backgroundColor: theme.colors.surfaceElevated,
            padding: theme.spacing.xl,
        }}>
        <react_native_1.Text style={{
            color: accent.accent,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
          Read the book
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: compact ? 26 : 30,
            fontWeight: '700',
            lineHeight: compact ? 34 : 38,
        }}>
          Continue with {nextChapter.title}
        </react_native_1.Text>
        <react_native_1.Text style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.body,
            fontSize: theme.typography.body,
            lineHeight: 26,
        }}>
          This unit is structured as an eight-chapter scientific monograph with glossary support,
          flashcards, quizzes, and locally persisted study state.
        </react_native_1.Text>
        <Button_1.Button label="Continue Reading" icon="play-outline" onPress={() => router.push((0, routes_1.chapterRoute)(subject.id, topic.id, unit.id, nextChapter.id))} accent={accent}/>
      </react_native_1.View>

      <react_native_1.View style={{
            gap: theme.spacing.md,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: accent.line,
            backgroundColor: accent.panel,
            padding: theme.spacing.xl,
        }}>
        <react_native_1.Text style={{
            color: accent.accentStrong,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
          At a glance
        </react_native_1.Text>
        {unit.metadata.map((item) => (<react_native_1.View key={item.label} style={{
                gap: 4,
                paddingBottom: theme.spacing.sm,
                borderBottomWidth: 1,
                borderBottomColor: accent.line,
            }}>
            <react_native_1.Text style={{
                color: accent.accent,
                fontFamily: theme.fonts.mono,
                fontSize: 11,
                fontWeight: '700',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
            }}>
              {item.label}
            </react_native_1.Text>
            <react_native_1.Text style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.reading,
                fontSize: 19,
                lineHeight: 28,
            }}>
              {item.value}
            </react_native_1.Text>
          </react_native_1.View>))}
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
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            fontSize: compact ? 22 : 26,
            fontWeight: '700',
        }}>
          Glossary
        </react_native_1.Text>
        {unit.glossary.map((term) => (<react_native_1.View key={term.term} style={{ gap: 4 }}>
            <react_native_1.Text style={{
                color: accent.accent,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.7,
                textTransform: 'uppercase',
            }}>
              {term.term}
            </react_native_1.Text>
            <react_native_1.Text style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: 14,
                lineHeight: 22,
            }}>
              {term.definition}
            </react_native_1.Text>
          </react_native_1.View>))}
      </react_native_1.View>
    </react_native_1.View>);
    const hero = (<react_native_1.View style={{
            overflow: 'hidden',
            gap: theme.spacing.lg,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: accent.line,
            backgroundColor: accent.heroFrom,
            padding: heroPadding,
        }}>
      <react_native_1.View style={{
            position: 'absolute',
            right: -20,
            top: -20,
            width: 240,
            height: 240,
            borderRadius: 120,
            backgroundColor: accent.glow,
        }}/>
      <react_native_1.Text style={{
            color: accent.accentContrast,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>
        {unit.hero.eyebrow}
      </react_native_1.Text>
      <react_native_1.View style={{
            flexDirection: compact ? 'column' : 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: theme.spacing.lg,
            minWidth: 0,
        }}>
        <react_native_1.View style={{ flex: 1, gap: theme.spacing.md }}>
          <react_native_1.Text style={{
            color: accent.accentContrast,
            fontFamily: theme.fonts.display,
            fontSize: heroTitleSize,
            fontWeight: '700',
            lineHeight: Math.round(heroTitleSize * 1.08),
            flexShrink: 1,
        }}>
            {unit.title}
          </react_native_1.Text>
          <react_native_1.Text style={{
            maxWidth: compact ? '100%' : 820,
            color: 'rgba(255,255,255,0.84)',
            fontFamily: theme.fonts.body,
            fontSize: heroOverviewSize,
            lineHeight: heroOverviewSize >= 18 ? 30 : 26,
        }}>
            {unit.overview}
          </react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={{
            minWidth: heroBadgeSize,
            minHeight: heroBadgeSize,
            borderRadius: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.22)',
            backgroundColor: 'rgba(255,255,255,0.08)',
            alignSelf: compact ? 'flex-start' : 'auto',
            paddingHorizontal: compact ? theme.spacing.md : theme.spacing.sm,
        }}>
          <react_native_1.Text style={{
            color: accent.accentContrast,
            fontFamily: theme.fonts.display,
            fontSize: heroBadgeTextSize,
            fontWeight: '700',
        }}>
            {unit.metadata[0]?.value}
          </react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
      <react_native_1.View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
        }}>
        {unit.hero.facts.map((fact) => (<react_native_1.View key={fact} style={{
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.18)',
                backgroundColor: 'rgba(255,255,255,0.06)',
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: 8,
                maxWidth: '100%',
            }}>
            <react_native_1.Text style={{
                color: accent.accentContrast,
                fontFamily: theme.fonts.mono,
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 0.6,
                flexShrink: 1,
                lineHeight: 18,
                textTransform: 'uppercase',
            }}>
              {fact}
            </react_native_1.Text>
          </react_native_1.View>))}
      </react_native_1.View>
      <react_native_1.Text style={{
            color: 'rgba(255,255,255,0.72)',
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
        }}>
        {unitProgress.completed} of {unitProgress.total} chapters completed
      </react_native_1.Text>
    </react_native_1.View>);
    return (<AppShell_1.AppShell hero={hero} accent={accent} breadcrumbs={[
            { label: 'Home', href: (0, routes_1.homeRoute)() },
            { label: subject.title, href: (0, routes_1.subjectRoute)(subject.id) },
            { label: topic.title, href: (0, routes_1.topicRoute)(subject.id, topic.id) },
            { label: unit.title },
        ]}>
      <ResponsiveLayout_1.ResponsiveLayout sidebar={sidebar} sidebarPosition="start" sidebarWidth={336} mobileSidebarPosition="before">
        <react_native_1.View style={{ gap: theme.spacing.lg }}>
          <SectionHeader_1.SectionHeader eyebrow="Chapters" title="The book" description="Read the unit sequentially or move directly to a chapter. Each entry preserves completion, bookmarks, flashcard review state, and quiz scores locally." accent={accent}/>
          {unit.chapters.map((chapter) => {
            const completed = (0, selectors_1.isChapterComplete)(progress, unit.id, chapter.id);
            const result = (0, selectors_1.getQuizResult)(progress, unit.id, chapter.id);
            return (<ChapterCard_1.ChapterCard key={chapter.id} unitId={unit.id} chapter={chapter} completed={completed} scoreLabel={result ? `Best quiz score ${(0, format_1.formatQuizScore)(result.bestScore, result.totalQuestions)}` : undefined} onPress={() => router.push((0, routes_1.chapterRoute)(subject.id, topic.id, unit.id, chapter.id))}/>);
        })}
        </react_native_1.View>
      </ResponsiveLayout_1.ResponsiveLayout>
    </AppShell_1.AppShell>);
}
