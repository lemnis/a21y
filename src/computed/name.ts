import textAlternative from './utils/textAlternativeClass';

export default async function(ay, origin): Promise<String> {
	return (await new textAlternative(ay, 'name') as any);
}