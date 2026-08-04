import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { CommandMenuStudy } from "../../../studies/command-menu/Study";
import { DrawerToastStudy } from "../../../studies/drawer-toast/Study";
import { OptimisticTableStudy } from "../../../studies/optimistic-table/Study";
import { studies, type Study } from "../../../lib/registry";

const COMPOSITIONS: Record<string, ComponentType<{ meta: Study }>> = {
  "command-menu": CommandMenuStudy,
  "drawer-toast": DrawerToastStudy,
  "optimistic-table": OptimisticTableStudy,
};

export function generateStaticParams() {
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(
  props: PageProps<"/study/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = studies.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: `${study.title} — Loft`,
    description: study.summary,
  };
}

export default async function StudyPage(props: PageProps<"/study/[slug]">) {
  const { slug } = await props.params;
  const study = studies.find((s) => s.slug === slug);
  const Composition = study ? COMPOSITIONS[study.slug] : undefined;
  if (!study || !Composition) notFound();
  return <Composition meta={study} />;
}
