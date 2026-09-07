import type { JSX, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps): SVGProps<SVGSVGElement> {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...props,
  };
}

export function HomeIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h3v-5.5h4V20h3a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

export function CompassIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.8 9.2-1.8 4.8a1 1 0 0 1-.8.8l-4.8 1.8 1.8-4.8a1 1 0 0 1 .8-.8Z" />
    </svg>
  );
}

export function MessageIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <path d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.3-3.6A7.96 7.96 0 0 1 4 12Z" />
    </svg>
  );
}

export function UserIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" />
    </svg>
  );
}

export function MoonIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

export function SunIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );
}

export function SearchIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.3-4.3" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function XIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function HeartIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <path d="M12 20.5s-7.5-4.6-9.7-9.3C.7 7.8 2.4 4.5 5.8 4a4.6 4.6 0 0 1 6.2 2.2A4.6 4.6 0 0 1 18.2 4c3.4.5 5.1 3.8 3.5 7.2C19.5 15.9 12 20.5 12 20.5Z" />
    </svg>
  );
}

export function StarIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <path d="m12 3 2.6 5.6 6 .7-4.4 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.4-4.2 6-.7Z" />
    </svg>
  );
}

export function BellIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10Z" />
      <path d="M10 18.5a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps): JSX.Element {
  return (
    <svg {...{ ...base(props), fill: "currentColor", stroke: "none" }}>
      <path d="M12 3c0 4-3 7-7 7 4 0 7 3 7 7 0-4 3-7 7-7-4 0-7-3-7-7Z" />
    </svg>
  );
}

export function AlertIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <path d="M12 16.2h.01" />
    </svg>
  );
}

export function GamepadIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="8" width="19" height="10" rx="5" />
      <path d="M7 11v4M5 13h4" />
      <path d="M16.2 12.2h.01M18.8 14.2h.01" />
    </svg>
  );
}

export function MusicNoteIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <path d="M9 18V5l10-2v13" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </svg>
  );
}

export function FilmIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M3 15h18M8 4v16M16 4v16" />
    </svg>
  );
}

export function CoffeeIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <path d="M5 9h11v5a5 5 0 0 1-5 5H9a4 4 0 0 1-4-4Z" />
      <path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M7 5.5c0 .8.7 1-.5 2M10 5.5c0 .8.7 1-.5 2" />
    </svg>
  );
}

export function CodeIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
    </svg>
  );
}

export function SignalBarsIcon(props: IconProps): JSX.Element {
  return (
    <svg viewBox="0 0 20 12" fill="currentColor" aria-hidden="true" {...props}>
      <rect x="0" y="7" width="3" height="5" rx="0.75" />
      <rect x="5.5" y="5" width="3" height="7" rx="0.75" />
      <rect x="11" y="3" width="3" height="9" rx="0.75" />
      <rect x="16.5" y="0" width="3" height="12" rx="0.75" />
    </svg>
  );
}

export function WifiIcon(props: IconProps): JSX.Element {
  return (
    <svg viewBox="0 0 20 14" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 5.2C6.8-.6 13.2-.6 19 5.2M4 8.3c3.9-3.6 8.1-3.6 12 0M7.2 11.3a4 4 0 0 1 5.6 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="10" cy="13.3" r="1" fill="currentColor" />
    </svg>
  );
}

export function BatteryIcon(props: IconProps): JSX.Element {
  return (
    <svg viewBox="0 0 25 12" fill="none" aria-hidden="true" {...props}>
      <rect x="0.75" y="0.75" width="20.5" height="10.5" rx="2.8" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <rect x="2.25" y="2.25" width="16" height="7.5" rx="1.6" fill="currentColor" />
      <path d="M22.5 4v4a1.8 1.8 0 0 0 1-1.6V5.6A1.8 1.8 0 0 0 22.5 4Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function LogOutIcon(props: IconProps): JSX.Element {
  return (
    <svg {...base(props)}>
      <path d="M9 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}
