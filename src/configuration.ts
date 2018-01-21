export interface IConfiguration {
    shouldRequireExplicitlySetProperties: (value: boolean) => this;
    shouldIgnoreSourcePropertiesIfNotInDestination: (value: boolean) => this;
}

export interface IMapConfiguration extends IConfiguration {
    
}

export interface ISingleMapConfiguration extends IMapConfiguration {

}

export type TConfigurationSetter<T extends IConfiguration> = (configuration: T) => T;

export class Configuration implements ISingleMapConfiguration {
    public explicitlySetProperties: boolean = false;
    public ignoreSourcePropertiesIfNotInDestination: boolean = false;

    shouldRequireExplicitlySetProperties: (value: boolean) => this =
        (value = false) => {
            this.explicitlySetProperties = value;
            return this;
        };

    shouldIgnoreSourcePropertiesIfNotInDestination: (value: boolean) => this =
        (value = false) => {
            this.ignoreSourcePropertiesIfNotInDestination = value;
            return this;
        };
}

export type TPreconditionConfiguration<T> = (element: T) => boolean;

export interface IFieldConfiguration<S, D> {
    precondition: (configuration: TPreconditionConfiguration<S>) => this;
    destinationPrecondition: (configuration: TPreconditionConfiguration<D>) => this;
}

export class FieldConfiguration<S, D> implements IFieldConfiguration<S, D> {

    private _sourcePreconditions: TPreconditionConfiguration<S>[] = [];
    private _destPreconditions: TPreconditionConfiguration<D>[] = [];

    precondition(configuration: TPreconditionConfiguration<S>) {
        this._sourcePreconditions.push(configuration);
        return this;
    }

    destinationPrecondition(configuration: TPreconditionConfiguration<D>) {
        this._destPreconditions.push(configuration);
        return this;
    }
}