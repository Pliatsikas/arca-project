import { useMousePosition } from "@/hooks/useMousePosition";

export function LightSource() {
  const { x, y } = useMousePosition();
  return <div className="light-source" style={{ left: x, top: y }} />;
}
