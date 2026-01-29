import Breadcrumb from "../../components/Breadcrumb";
import PageTransition from "../../components/PageTransition";

export default function Education() {
  return (
    <PageTransition>
      <Breadcrumb />
    <main className="page">
      <section className="wp-hero">
      <h1>🧠 Education</h1>
      <p className="subtitle">
        Character building for real life.
      </p>
      </section>

      <section className="education-list">
        <a href="/education/introduction" className="card">
          <p><strong>Introduction :</strong> (Description about characters.)</p>
        </a>

        <a href="/education/..." className="card">
          <p>.....</p>
        </a>

        <a href="/education/...." className="card">
          <p>.....</p>
        </a>
      </section>
    </main>
    </PageTransition>
  );
}
