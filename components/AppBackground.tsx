"use client";

export default function AppBackground() {
  return (
    <div aria-hidden className="app-background pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="app-background__base" />
      <div className="app-background__shimmer" />
      <div className="app-background__orb app-background__orb--violet" />
      <div className="app-background__orb app-background__orb--blue" />
      <div className="app-background__orb app-background__orb--cyan" />
      <div className="app-background__orb app-background__orb--pink" />
      <div className="app-background__orb app-background__orb--gold" />
      <div className="app-background__mesh" />
      <div className="app-background__noise" />
    </div>
  );
}
