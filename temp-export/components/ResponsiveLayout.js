"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiveLayout = ResponsiveLayout;
const react_native_1 = require("react-native");
const use_breakpoints_1 = require("@/hooks/use-breakpoints");
function ResponsiveLayout({ children, sidebar, style, sidebarStyle, contentStyle, sidebarPosition = 'end', sidebarWidth = 320, mobileSidebarPosition = 'after', }) {
    const { contentMaxWidth, gutter, isDesktop } = (0, use_breakpoints_1.useBreakpoints)();
    const showSidebarFirstOnMobile = !isDesktop && mobileSidebarPosition === 'before';
    return (<react_native_1.View style={[
            {
                width: '100%',
                alignSelf: 'center',
                maxWidth: contentMaxWidth,
                paddingHorizontal: gutter,
            },
            style,
        ]}>
      {sidebar ? (<react_native_1.View style={{
                flexDirection: isDesktop ? 'row' : 'column',
                alignItems: 'flex-start',
                gap: gutter,
            }}>
          {(sidebarPosition === 'start' && isDesktop) || showSidebarFirstOnMobile ? (<react_native_1.View style={[{ width: sidebarWidth }, sidebarStyle]}>{sidebar}</react_native_1.View>) : null}
          <react_native_1.View style={[{ flex: 1, width: '100%' }, contentStyle]}>{children}</react_native_1.View>
          {(sidebarPosition === 'end' && isDesktop) || (!isDesktop && !showSidebarFirstOnMobile) ? (<react_native_1.View style={[{ width: isDesktop ? sidebarWidth : '100%' }, sidebarStyle]}>{sidebar}</react_native_1.View>) : null}
        </react_native_1.View>) : (children)}
    </react_native_1.View>);
}
