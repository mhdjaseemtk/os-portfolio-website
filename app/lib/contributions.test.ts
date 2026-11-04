import { describe, expect, it } from "vitest";
import {
  buildFileEntries,
  listLocation,
  getLocationTitle,
} from "./file-system";
import {
  buildSearchIndex,
  searchIndex,
} from "../components/spotlight/search-index";
import { createContent } from "../../test/fixtures";

const content = createContent({
  contributions: [
    {
      id: "sample-oss-1",
      repository: "sample/repo",
      title: "Sample Feature",
      number: 1,
      status: "Merged",
      description: "Sample pull request description.",
      tags: ["TypeScript", "React"],
      link: "https://github.com/sample/repo/pull/1",
    },
  ],
});
const entries = buildFileEntries(content);
const state = { trashed: [], isVisible: () => true };

describe("open-source contributions", () => {
  it("exposes the section on the desktop and its contribution in Finder", () => {
    expect(getLocationTitle("contributions", content.profile.username)).toBe(
      "Open Source"
    );
    expect(
      listLocation("desktop", entries, content.profile.username, state).some(
        (e) => e.id === "contributions"
      )
    ).toBe(true);
    const [contribution] = listLocation(
      "contributions",
      entries,
      content.profile.username,
      state
    );
    expect(contribution.open).toEqual({
      type: "app",
      app: "notes",
      payload: "sample-oss-1",
    });
    expect(contribution.info?.link).toBe(
      "https://github.com/sample/repo/pull/1"
    );
  });
  it("finds contributions through Spotlight and tags", () => {
    expect(searchIndex(buildSearchIndex(content), "repo")[0].target).toEqual({
      type: "app",
      app: "notes",
      payload: "sample-oss-1",
    });
    expect(
      listLocation("tag:TypeScript", entries, content.profile.username, state).some(
        (e) => e.id === "sample-oss-1"
      )
    ).toBe(true);
  });
});
