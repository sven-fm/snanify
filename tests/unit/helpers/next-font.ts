/* next/font is a build-time transform; under Vitest each face is a stub that
   names its CSS variable, so components that set a font class render. */
type Options = { variable?: string };
const face = (o: Options = {}) => ({ className: "", variable: o.variable?.replace(/^--/, "font-var-") ?? "", style: {} });
export const Eczar = face;
export const Martel_Sans = face;
