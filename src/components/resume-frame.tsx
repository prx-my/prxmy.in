export function ResumeFrame({ name, file }: { name: string; file: string }) {
  return (
    <main className="flex h-dvh flex-col">
      <iframe src={file} title={`${name}, Resume`} className="w-full flex-1 bg-beige" />
    </main>
  );
}
