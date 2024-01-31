import plugin from 'tailwindcss/plugin'

export interface TextScalePluginOptions {
  /** Custom minimum screen width */
  minScreen?: number;
  /** Custom maximum screen width */
  maxScreen?: number;
  /** Custom prefix for the generated classes */
  prefix?: string;
  /** Custom prefix for the generated CSS variables */
  varsPrefix?: string;
}

const textScalePlugin = plugin.withOptions<TextScalePluginOptions>(
  ({
    minScreen: minScreenOption,
    maxScreen: maxScreenOption,
    prefix = 'text',
    varsPrefix = 'text-scale',
  } = {}) => ({ addBase, matchUtilities, theme }) => {

    const [minScreen, maxScreen] = [
      typeof minScreenOption === 'number' ? minScreenOption : theme('screens.sm') as string | null,
      typeof maxScreenOption === 'number' ? maxScreenOption : theme('screens.2xl') as string | null
    ].map((screen, i) => {
      if (screen && typeof screen === 'string' && screen.includes('px')) {
        return parseInt(screen.replace('px', ''))
      } else {
        throw new Error(
          `tailwindcss-text-scale error: ` +
          `${i === 0 ? 'screens.sm' : 'screens.2xl'} should be in pixels ` +
          `or you need to provide a custom value for ${i === 0 ? 'minScreen' : 'maxScreen'}`
        )
      }
    });


    const baseMatcher = `[class*="${prefix}-min"][class*="${prefix}-max"]`

    const screenMatcher = `:root, [class*="${prefix}-screen-min"], [class*="${prefix}-screen-max"]`

    addBase({
      ":root": {
        [`--${varsPrefix}-screen-max`]: maxScreen.toString(),
        [`--${varsPrefix}-screen-min`]: minScreen.toString(),
      },
      [screenMatcher]: {
        [`--${varsPrefix}-offset`]: `calc(100vw - var(--${varsPrefix}-screen-min) * 1px)`,
        [`--${varsPrefix}-screen-difference`]: `calc(
          var(--${varsPrefix}-screen-max) - var(--${varsPrefix}-screen-min)
        )`,
        /* *16 because clamp-percentage is in px and fontSize is in rem */
        [`--${varsPrefix}-percentage`]: `calc(
          var(--${varsPrefix}-offset) / var(--${varsPrefix}-screen-difference) * 16
        )`,
      },
      [baseMatcher]: {
        [`--${varsPrefix}-min-rem`]: `calc(var(--${varsPrefix}-min) * 1rem)`,
        [`--${varsPrefix}-max-rem`]: `calc(var(--${varsPrefix}-max) * 1rem)`,
        [`--${varsPrefix}-current-rem`]: `calc(
          var(--${varsPrefix}-percentage) * (var(--${varsPrefix}-max) -
          var(--${varsPrefix}-min)) +
          var(--${varsPrefix}-min-rem)
        )`,
        'font-size': `clamp(
          var(--${varsPrefix}-min-rem),
          var(--${varsPrefix}-current-rem),
          var(--${varsPrefix}-max-rem)
        )`
      }
    })

    const fontSizes = theme('fontSize');
    const screens = theme('screens');

    matchUtilities(
      {
        [`${prefix}-min`]: (value) => {
          const clampedUnit = unitToRem(value);
          return {
            [`--${varsPrefix}-min`]: clampedUnit,
          };
        },
        [`${prefix}-max`]: (value) => {
          const clampedUnit = unitToRem(value);
          return {
            [`--${varsPrefix}-max`]: clampedUnit,
          };
        },
      },
      {
        values: fontSizes,
      }
    )

    matchUtilities(
      {
        [`${prefix}-screen-min`]: (value) => {
          const parsedUnit = parseScreenSize(value);
          return {
            [`--${varsPrefix}-screen-min`]: parsedUnit,
          };
        },
        [`${prefix}-screen-max`]: (value) => {
          const parsedUnit = parseScreenSize(value);
          return {
            [`--${varsPrefix}-screen-max`]: parsedUnit,
          };
        },
      },
      {
        values: screens,
      }
    )

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