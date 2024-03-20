import plugin from 'tailwindcss/plugin'

export interface TextScalePluginOptions {
  /** Custom minimum screen width */
  minScreen?: number;
  /** Custom maximum screen width */
  maxScreen?: number;
  /** Custom prefix for the generated text classes */
  textScalePrefix?: string;
  /** Custom prefix for the generated screen classes */
  screenScalePrefix?: string;
  /** Custom prefix for the generated CSS variables */
  varsPrefix?: string;
  /** Enable or disable clamping */
  clamp?: boolean
}

const textScalePlugin = plugin.withOptions<TextScalePluginOptions>(
  ({
    minScreen: minScreenOption,
    maxScreen: maxScreenOption,
    textScalePrefix = 'text-scale',
    screenScalePrefix = 'text-screen',
    varsPrefix = 'text-scale',
    clamp = true
  } = {}) => ({ addBase, matchUtilities, theme }) => {

    const [minScreen, maxScreen] = [
      typeof minScreenOption === 'number' ? minScreenOption : theme('screens.sm') as number | string | null,
      typeof maxScreenOption === 'number' ? maxScreenOption : theme('screens.2xl') as number | string | null
    ].map((screen, i) => {
      if (typeof screen === 'number') {
        return screen;
      }
      if (typeof screen === 'string' && screen.includes('px')) {
        return parseInt(screen.replace('px', ''))
      } else {
        const valueToSet = i === 0 ? 'screens.sm' : 'screens.2xl';
        const optionToSet = i === 0 ? 'minScreen' : 'maxScreen';

        const errorMessage = `
tailwindcss-text-scale error:
You don't have  a value for ${valueToSet} in your tailwind theme.
Add one or edit your plugin config:
  textScalePlugin({
    ${optionToSet}: number
  })
`
        throw new Error(errorMessage);
      }
    });

    addBase({
      ":root": {
        [`--${varsPrefix}-screen-max`]: maxScreen.toString(),
        [`--${varsPrefix}-screen-min`]: minScreen.toString(),
        [`--${varsPrefix}-offset`]: `calc(100vw - var(--${varsPrefix}-screen-min) * 1px)`,
        [`--${varsPrefix}-screen-difference`]: `calc(
          var(--${varsPrefix}-screen-max) - var(--${varsPrefix}-screen-min)
        )`,
        /* *16 because clamp-percentage is in px and fontSize is in rem */
        [`--${varsPrefix}-percentage`]: `calc(
          var(--${varsPrefix}-offset) / var(--${varsPrefix}-screen-difference) * 16
        )`,
      },
    })

    const fontSizes = theme('fontSize');
    const screens = theme('screens');

    matchUtilities({
      [`${textScalePrefix}`]: (value, { modifier }) => {
        if (modifier === null) return {}
        const clampedUnitMin = unitToRem(value);
        const clampedUnitMax = unitToRem(modifier);

        return {
          'font-size': Boolean(clamp) ? `clamp(
            var(--${varsPrefix}-min-rem),
            var(--${varsPrefix}-current-rem),
            var(--${varsPrefix}-max-rem)
          )` : `var(--${varsPrefix}-current-rem)`,
          [`--${varsPrefix}-min`]: clampedUnitMin,
          [`--${varsPrefix}-max`]: clampedUnitMax,
          [`--${varsPrefix}-min-rem`]: `calc(var(--${varsPrefix}-min) * 1rem)`,
          [`--${varsPrefix}-max-rem`]: `calc(var(--${varsPrefix}-max) * 1rem)`,
          [`--${varsPrefix}-current-rem`]: `calc(
            var(--${varsPrefix}-percentage) * (var(--${varsPrefix}-max) -
            var(--${varsPrefix}-min)) +
            var(--${varsPrefix}-min-rem)
          )`,
        } as Record<string, string>;
      }
    }, {
      values: fontSizes,
      modifiers: fontSizes,
    })

    matchUtilities({
      [`${screenScalePrefix}`]: (value, { modifier }) => {
        if (modifier === null) return {}
        const clampedUnitMin = parseScreenSize(value);
        const clampedUnitMax = parseScreenSize(modifier);

        return {
          [`--${varsPrefix}-screen-min`]: clampedUnitMin,
          [`--${varsPrefix}-screen-max`]: clampedUnitMax,
          [`--${varsPrefix}-offset`]: `calc(100vw - var(--${varsPrefix}-screen-min) * 1px)`,
          [`--${varsPrefix}-screen-difference`]: `calc(
            var(--${varsPrefix}-screen-max) - var(--${varsPrefix}-screen-min)
          )`,
          /* *16 because clamp-percentage is in px and fontSize is in rem */
          [`--${varsPrefix}-percentage`]: `calc(
            var(--${varsPrefix}-offset) / var(--${varsPrefix}-screen-difference) * 16
          )`,
        }
      }
    }, {
      values: screens,
      modifiers: screens
    })
  }
)

/** Utils */

const getScreenSizeAsNumber = (value: string): number | null => {
  if (value.includes('px')) {
    return parseInt(value.replace('px', ''));
  } else if (typeof value === 'number') {
    return value;
  }
  return null;
}

const parseScreenSize = (value: string): string => {
  const v = getScreenSizeAsNumber(value);

  if (typeof v === 'number' && !isNaN(v)) {
    return v.toString();
  } else {
    return `Invalid screen size ${value}`;
  }
}

const clampUnitReplace = (value: unknown): number | null => {

  if (Array.isArray(value)) {
    return clampUnitReplace(value[0]);
  }

  if (typeof value === 'string') {
    if (value.includes('rem')) {
      return parseFloat(value.replace(/rem/, ''));
    } else if (value.includes('px')) {
      return parseFloat(value.replace(/px/, '')) / 16;
      // match numbers with regex
    } else if (value.match(/^[0-9.]+$/)) {
      return parseFloat(value);
    } else {
      return null;
    }
  } else if (typeof value === 'number') {
    return value
  }
  return null;
};

// Add value in px as comment for reference
const addUnitCommentInPx = (value: number) => `${value} /* ${value * 16}px */`;

const addErrorComment = (value: string, error: unknown) => `${value} /* ${error} */`;

const unitToRem = (value: unknown): string => {
  const replacedValue = clampUnitReplace(value);
  return (typeof replacedValue === 'number' && !isNaN(replacedValue)) ?
    addUnitCommentInPx(replacedValue) :
    addErrorComment('error:', 'Base unit should be px rem or number, revieved ' + value);
};

export default textScalePlugin