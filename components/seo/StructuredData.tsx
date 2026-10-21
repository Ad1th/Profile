/**
 * Escaping `<` keeps any string that happens to contain "</script>" from
 * closing the tag early; JSON parsers read < back as "<".
 */
export default function StructuredData({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
