import { NHAN_TAG, TAGS, type Tag } from "../features/chuyen-di/types";

type ChonTagsProps = {
  daChon: string[];
  onDoi: (tags: string[]) => void;
};

export function ChonTags({ daChon, onDoi }: ChonTagsProps) {
  function toggle(tag: Tag) {
    if (daChon.includes(tag)) {
      onDoi(daChon.filter((t) => t !== tag));
    } else {
      onDoi([...daChon, tag]);
    }
  }

  return (
    <div className="chon-tags" role="group" aria-label="Chọn tags">
      {TAGS.map((tag) => {
        const chon = daChon.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            className={`chon-tags__tag${chon ? " chon-tags__tag--chon" : ""}`}
            onClick={() => toggle(tag)}
            aria-pressed={chon}
          >
            {NHAN_TAG[tag]}
          </button>
        );
      })}
    </div>
  );
}

type BadgeTagsProps = {
  tags: string[];
};

export function BadgeTags({ tags }: BadgeTagsProps) {
  if (tags.length === 0) return null;
  return (
    <div style={{ marginTop: 8 }}>
      {tags.map((tag) => {
        const nhan = NHAN_TAG[tag as Tag] ?? tag;
        return (
          <span key={tag} className="badge-tag">
            {nhan}
          </span>
        );
      })}
    </div>
  );
}
