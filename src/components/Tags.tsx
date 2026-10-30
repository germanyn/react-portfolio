/** Small pills listing technologies. */
export default function Tags({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {items.map(item => (
        <li
          key={item}
          className="rounded-full border border-x-blue/40 bg-x-blue/15 px-[0.55rem] py-[0.15rem] text-xs text-[#bcd6ff]"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
