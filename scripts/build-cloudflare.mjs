import { loadAndParseConfig } from "@cloudflare/config";
import {
  cleanBuildOutputDir,
  writeAssets,
  writeRootConfig,
  writeWorkerConfig,
} from "@cloudflare/build-output-utils";

// Package Next's static export for cf deploy --prebuilt. cf init currently
// selects OpenNext even for sites that only need static assets.
const root = process.cwd();
const buildContext = { isPreview: false, mode: "production" };
const { result } = await loadAndParseConfig(`${root}/cloudflare.config.ts`, buildContext);
if (!result.success) throw result.error;
const { worker, accountId, complianceRegion } = result.data;
await cleanBuildOutputDir(root);
await writeAssets({ root, sourceDirectory: `${root}/out` });
await writeWorkerConfig({ root, config: worker });
await writeRootConfig(root, { accountId, complianceRegion }, buildContext);
