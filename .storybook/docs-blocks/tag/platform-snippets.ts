export const tagPlatformSnippets = {
  react: `import Tag from '@useblu/ocean-react/Tag';

<Tag type="positive">Paid</Tag>`,
  swift: `OceanSwiftUI.Tag(
    parameters: OceanSwiftUI.TagParameters(
        label: "Paid",
        status: .positive,
        size: .medium
    )
)`,
  compose: `OceanTag(
    style = OceanTagStyle.Default(
        label = "Paid",
        layout = OceanTagLayout.Medium(
            icon = OceanIcons.CHECK_CIRCLE_SOLID
        ),
        type = OceanTagType.Positive
    )
)`,
};
