
export class StringMap extends Map<string, string|StringMap> {
    // Hax?

    intersect(map: StringMap): StringMap {
        let result = new StringMap();

        for (let key in this.keys()) {
            if (!map.has(key)) {
                continue;
            }

            let value = this.get(key);
            let compareValue = map.get(key);

            if (value instanceof StringMap) {
                if (compareValue instanceof StringMap) {
                    result.set(key, value.intersect(compareValue));
                }
            } else if (value === compareValue) {
                result.set(key, value);
            }
        }

        return result;
    }
}
