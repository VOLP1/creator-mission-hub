import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers as any);

import { Heading } from "./heading";

describe("Heading (src/components/ui/heading.tsx)", () => {
  it("renders default section heading", () => {
    const { getByText } = render(<Heading>Teste</Heading>);
    const el = getByText("Teste");
    expect(el.tagName).toBe("H2");
    expect(el.className).toMatch(/text-2xl/);
  });

  it("respects custom 'as' prop", () => {
    const { getByText } = render(<Heading as="h3">Outro</Heading>);
    const el = getByText("Outro");
    expect(el.tagName).toBe("H3");
  });

  it("applies hero variant classes", () => {
    const { getByText } = render(<Heading variant="hero">Hero</Heading>);
    const el = getByText("Hero");
    expect(el.className).toMatch(/tracking-tight/);
    expect(el.className).toMatch(/text-3xl/); // mobile size
  });

  it("removes margin when noMargin is true", () => {
    const { getByText } = render(<Heading noMargin>Sem margem</Heading>);
    const el = getByText("Sem margem");
    expect(el.className).not.toMatch(/mb-6/);
  });
});