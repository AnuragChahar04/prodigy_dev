const items = ['Custom Software','Web Development','Mobile Apps','Digital Marketing','Hosting Services','Enterprise Solutions','UI/UX Design','API Integration','Cloud Infrastructure']

export default function Marquee() {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-outer">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div className="marquee-item" key={i}>
            <div className="marquee-dot" />{item}
          </div>
        ))}
      </div>
    </div>
  )
}
