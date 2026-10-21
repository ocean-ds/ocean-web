export const tagPlatformSnippets = {
  react: `import Tag from '@useblu/ocean-react/Tag';

<Tag type="positive">Harbor Market</Tag>`,
  swift: `OceanSwiftUI.Tag(
    parameters: OceanSwiftUI.TagParameters(
        label: "Harbor Market",
        status: .positive,
        size: .medium
    )
)`,
  compose: `OceanTag(
    style = OceanTagStyle.Default(
        label = "Harbor Market",
        layout = OceanTagLayout.Medium(
            icon = OceanIcons.CHECK_CIRCLE_SOLID
        ),
        type = OceanTagType.Positive
    )
)`,
};
