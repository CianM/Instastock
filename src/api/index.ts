import { LoremPicsumService } from "./lorem-picsum";

type Service = LoremPicsumService;
type Source = LoremPicsumService["ID"];

const loremPicsumService = new LoremPicsumService();

const SERVICE_MAP: { [id: string]: Service } = {
	[loremPicsumService.ID]: loremPicsumService
};

export { loremPicsumService, SERVICE_MAP, Source };
