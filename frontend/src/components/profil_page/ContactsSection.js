function ContactsSection({ friends = [], neighbors = [] }) {
  return (
    <div className="mt-3">
      <h5>שכנים וחברים</h5>
      {friends.map((f, i) => (
        <p key={`f-${i}`}>חבר/ה: {f.name} - {f.phone}</p>
      ))}
      {neighbors.map((n, i) => (
        <p key={`n-${i}`}>שכן/ה: {n.name} - {n.phone}</p>
      ))}
    </div>
  );
}
export default ContactsSection;