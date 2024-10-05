export abstract class MetadataRepository {
  abstract upload(id: number, name: string): Promise<void>;
}
