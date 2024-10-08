import { readFile, writeFile } from 'fs/promises'

const main = async () => {
  let kysely = await readFile(
    `${__dirname}/../node_modules/kysely-codegen/dist/db.d.ts`,
    'utf8'
  )
  kysely = kysely
    .replace(/import type { ColumnType } from "kysely";/, '')
    .replace(
      new RegExp('^export\\s+type\\s+Generated<[^>]+>.*?;\\s*$', 'ms'),
      ''
    )
    .replace(/Generated<(.*)>/g, '$1')
    .replace(/export type Timestamp =.*;/, 'export type Timestamp = Date')
  console.log('Writing kysely-pure.d.ts')
  await writeFile(
    `${__dirname}/../node_modules/kysely-codegen/dist/db-pure.d.ts`,
    kysely
  )
}

main()
