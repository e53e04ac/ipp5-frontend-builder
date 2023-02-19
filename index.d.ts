/*!
    @e53e04ac/ipp5-frontend-builder/index.d.ts
    Copyright (C) @e53e04ac
    MIT License
*/

import { AzureTerraformer } from 'azure-terraformer';
import { EventEmitter } from 'event-emitter';
import { FileEntry } from 'file-entry';
import { Get } from 'hold';
import { ValueOrGet } from 'hold';

export declare namespace Ipp5FrontendBuilder {

    type NginxConfVariableMap = {
        readonly containerAppPort: string;
        readonly backendApiHttpPathPrefix: string;
        readonly backendApiUrl: string;
        readonly backendBatchHttpPathPrefix: string;
        readonly backendBatchUrl: string;
        readonly backendIdpHttpPathPrefix: string;
        readonly backendIdpUrl: string;
        readonly backendStaticHttpPathPrefix: string;
        readonly backendStaticUrl: string;
    };

    type DockerfileVariableMap = {
        readonly containerAppGroup: string;
        readonly containerAppUser: string;
        readonly containerAppEntrypoint: string;
        readonly contextNginxConfRelativePath: string;
    };

    type Options = {
        readonly docker: ValueOrGet<string>;
        readonly tmpDirectory: ValueOrGet<FileEntry>;
        readonly buildId: ValueOrGet<string>;
        readonly noCache: ValueOrGet<boolean>;
        readonly containerAppGroup: ValueOrGet<string>;
        readonly containerAppUser: ValueOrGet<string>;
        readonly containerAppEntrypoint: ValueOrGet<string>;
        readonly containerAppPort: ValueOrGet<number>;
        readonly containerImageName: ValueOrGet<string>;
        readonly backendApiHttpPathPrefix: ValueOrGet<string>;
        readonly backendApiUrl: ValueOrGet<string>;
        readonly backendBatchHttpPathPrefix: ValueOrGet<string>;
        readonly backendBatchUrl: ValueOrGet<string>;
        readonly backendIdpHttpPathPrefix: ValueOrGet<string>;
        readonly backendIdpUrl: ValueOrGet<string>;
        readonly backendStaticHttpPathPrefix: ValueOrGet<string>;
        readonly backendStaticUrl: ValueOrGet<string>;
    };

    type EventSpecs = Record<never, never>;

    type _Self = {
        readonly options: Get<Options>;
        readonly _options: Get<unknown>;
        readonly scriptFile: Get<FileEntry>;
        readonly scriptDirectory: Get<FileEntry>;
        readonly templateNginxConf: Get<FileEntry>;
        readonly templateDockerfile: Get<FileEntry>;
        readonly runDirectory: Get<FileEntry>;
        readonly contextDirectory: Get<FileEntry>;
        readonly contextNginxConf: Get<FileEntry>;
        readonly contextDockerfile: Get<FileEntry>;
        readonly contextNginxConfRelativePath: Get<string>;
        readonly azureTerraformer: Get<AzureTerraformer>;
        readonly makeNginxConf: Get<Promise<void>>;
        readonly makeDockerfile: Get<Promise<void>>;
        readonly runDockerImageBuild: Get<Promise<void>>;
    };

    type Self = EventEmitter<EventSpecs> & {
        readonly _Ipp5FrontendBuilder: Get<_Self>;
        readonly build: Get<Promise<void>>;
    };

    type Constructor = {
        (options: Options): Self;
    };

    type Companion = Record<never, never>;

    type ConstructorWithCompanion = Constructor & Companion;

}

export declare type Ipp5FrontendBuilder = Ipp5FrontendBuilder.Self;

export declare const Ipp5FrontendBuilder: Ipp5FrontendBuilder.ConstructorWithCompanion;
