export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        // Return all projects
        const fileContent = fs.readFileSync(path.join(process.cwd(), 'src', 'data', 'projects.json'), 'utf-8');
        return Response.json(JSON.parse(fileContent));
    }

    // Return single project or delete functionality if method was different
    // ...
}
// Actually, I already made the GET/DELETE in app/api/projects/route.js
// This was a duplicate thought. I'll make the Edit page instead.
