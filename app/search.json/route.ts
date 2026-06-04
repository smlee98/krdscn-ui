import { createFromSource } from "fumadocs-core/search/server"

import { source } from "@/lib/source"

export const dynamic = "force-static"

const search = createFromSource(source)

export const GET = search.staticGET
