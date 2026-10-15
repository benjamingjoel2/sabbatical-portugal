export function GridLines({ light = false }: { light?: boolean }) {
  return (
    <div
      aria-hidden
      className="grid-lines"
      style={light ? ({ '--grid-c': 'rgb(248 245 238 / 0.08)' } as React.CSSProperties) : undefined}
    />
  );
}
