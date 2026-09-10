import { describe, expect, it } from "vitest";
import { CC_BY_4, DATASET_FIELDS, sourceDataset } from "@/components/StructuredData";
import { SOURCES } from "@/lib/riverdata";

/* ---------------------------------------------------------------------------
   Google reported this site's Dataset markup as incomplete: one node carried a
   name, a URL and a licence, and nothing else. A missing description is a
   critical issue, which means the page does not appear as a dataset at all.

   The cause was two definitions of the same thing, one full and one not. There
   is one now, and this is the check that keeps it complete.
   --------------------------------------------------------------------------- */

const dataset = sourceDataset({
  name: SOURCES.discharge.model,
  url: SOURCES.discharge.modelHref,
  served: SOURCES.discharge.served,
});

describe("the source dataset", () => {
  it("carries every field Google asks a Dataset for", () => {
    for (const field of DATASET_FIELDS) {
      expect(dataset[field], `Dataset is missing "${field}"`).toBeTruthy();
    }
  });

  it("describes itself in a sentence rather than a label", () => {
    expect(String(dataset.description).length).toBeGreaterThan(80);
  });

  it("credits the model as the creator, because we ran no model", () => {
    const creator = dataset.creator as { name?: string; "@type"?: string };
    expect(creator["@type"]).toBe("Organization");
    expect(creator.name).toContain("Copernicus");
  });

  it("states the licence the upstream data actually carries", () => {
    expect(dataset.license).toBe(CC_BY_4);
    expect(CC_BY_4).toContain("creativecommons.org/licenses/by/4.0");
  });

  it("points at the model, not at us", () => {
    expect(String(dataset.url)).not.toContain("snanify.com");
    expect(dataset.url).toBe(SOURCES.discharge.modelHref);
  });

  it("says modelled in its name, wherever it is cited", () => {
    /* The word carries the whole honesty of the figure: it is a model at a
       grid cell, not an instrument at a ghat. */
    expect(String(dataset.name).toLowerCase()).toContain("modelled");
  });
});
