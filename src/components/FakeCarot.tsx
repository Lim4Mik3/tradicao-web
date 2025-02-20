export function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center blinking-caret">
      <div className="w-px h-8 bg-slate-800" />
    </div>
  )
}