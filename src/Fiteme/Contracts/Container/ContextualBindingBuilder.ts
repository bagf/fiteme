
export interface ContextualBindingBuilder {
    needs(abstract: string): ContextualBindingBuilder;
    give(implementation: string);
}
