import ArrayInput from '@/components/shared/input/ArrayInput';

export function TagsTopicsSection() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ArrayInput name="tags" label="Tags" placeholder="Add a tag" />
      <ArrayInput name="topics" label="Topics" placeholder="Add a topic" />
    </div>
  );
}
