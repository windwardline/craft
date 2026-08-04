import { codeToHtml } from "shiki";

/* Server-rendered, build-time source display. The code strings are this
   repo's own files — trusted content, lit by shiki with dual themes the
   lamp switches via CSS variables. */
export async function SourcePane({
  code,
  lang = "tsx",
}: {
  code: string;
  lang?: string;
}) {
  const html = await codeToHtml(code.trim(), {
    lang,
    themes: { dark: "night-owl", light: "solarized-light" },
    defaultColor: false,
  });

  return (
    <div
      className="overflow-x-auto rounded-sm border border-batten bg-floor-raised p-4 text-[13px] leading-relaxed [&_pre]:bg-transparent"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
