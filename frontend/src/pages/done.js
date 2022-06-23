export default function Done() {
  let id = new URLSearchParams(window.location.search).get("id");
  return (
    <div className="cfs_form done">
      <h2 style={{ textAlign: "center" }}>
        Thanks for you confession submission
      </h2>
      <p style={{ textAlign: "center" }}>Your confession ID: {id} </p>
    </div>
  );
}
