export default function Header() {
  return (
    <header className="space-y-3 text-center">
      <h1 className="text-4xl font-bold tracking-tight">
        AI Powered CSV Importer
      </h1>

      <p className="mx-auto max-w-2xl text-muted-foreground">
        Upload any CSV file and intelligently extract CRM lead
        information using AI.
      </p>
    </header>
  );
}