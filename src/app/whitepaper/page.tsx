export default function Whitepaper() {
    const url =
    "https://goodboy-website.vercel.app/whitepaper.pdf";

    return (
        <main
        style={{
            width: "100%",
            height: "100vh",
            background: "#fff",
        }}>
        <iframe
            src={'https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true'}
            width="100%"
            height="100%"
            style={{
                border: "none",
            }}
        />
        </main>
    );
}