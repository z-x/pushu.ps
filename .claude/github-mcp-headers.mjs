// prints the auth header for the GitHub MCP server (see .mcp.json),
// the token is taken from GITHUB_PAT in .env, Claude Code runs this
// in the project directory every time it connects to the server
process.loadEnvFile('.env');

if(!process.env.GITHUB_PAT){
	console.error('GITHUB_PAT is missing in .env');
	process.exit(1);
}

console.log(JSON.stringify({ Authorization: `Bearer ${process.env.GITHUB_PAT}` }));
