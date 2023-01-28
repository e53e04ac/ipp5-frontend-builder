/*!
    @e53e04ac/ipp5-frontend-builder/index.mjs
    Copyright (C) @e53e04ac
    MIT License
*/

import { AzureTerraformer } from 'azure-terraformer';
import { EventEmitter } from 'event-emitter';
import { FileEntry } from 'file-entry-native';
import { hold } from 'hold';
import { unwrap } from 'hold';

/** @type {import('.').Ipp5FrontendBuilder.Constructor} */
const constructor = ((options) => {

    const _options = ({
        docker: hold(() => {
            return unwrap(options.docker);
        }),
        tmpDirectory: hold(() => {
            return unwrap(options.tmpDirectory);
        }),
        runId: hold(() => {
            return unwrap(options.buildId);
        }),
        noCache: hold(() => {
            return unwrap(options.noCache);
        }),
        containerAppGroup: hold(() => {
            return unwrap(options.containerAppGroup);
        }),
        containerAppUser: hold(() => {
            return unwrap(options.containerAppUser);
        }),
        containerAppEntrypoint: hold(() => {
            return unwrap(options.containerAppEntrypoint);
        }),
        containerAppPort: hold(() => {
            return unwrap(options.containerAppPort);
        }),
        containerImageName: hold(() => {
            return unwrap(options.containerImageName);
        }),
        backendApiHttpPathPrefix: hold(() => {
            return unwrap(options.backendApiHttpPathPrefix);
        }),
        backendApiUrl: hold(() => {
            return unwrap(options.backendApiUrl);
        }),
        backendBatchHttpPathPrefix: hold(() => {
            return unwrap(options.backendBatchHttpPathPrefix);
        }),
        backendBatchUrl: hold(() => {
            return unwrap(options.backendBatchUrl);
        }),
        backendIdpHttpPathPrefix: hold(() => {
            return unwrap(options.backendIdpHttpPathPrefix);
        }),
        backendIdpUrl: hold(() => {
            return unwrap(options.backendIdpUrl);
        }),
        backendStaticHttpPathPrefix: hold(() => {
            return unwrap(options.backendStaticHttpPathPrefix);
        }),
        backendStaticUrl: hold(() => {
            return unwrap(options.backendStaticUrl);
        }),
    });

    /** @type {import('.').Ipp5FrontendBuilder._Self} */
    const _self = ({
        options: (() => {
            return options;
        }),
        _options: (() => {
            return _options;
        }),
        scriptFile: hold(() => {
            return FileEntry(new URL(import.meta.url).pathname);
        }),
        scriptDirectory: hold(() => {
            return _self.scriptFile().parent();
        }),
        templateNginxConf: hold(() => {
            return _self.scriptDirectory().resolve('nginx.conf');
        }),
        templateDockerfile: hold(() => {
            return _self.scriptDirectory().resolve('Dockerfile');
        }),
        runDirectory: hold(() => {
            return _options.tmpDirectory().resolve('ipp5-frontend-builder', _options.runId());
        }),
        contextDirectory: hold(() => {
            return _self.runDirectory().resolve('context');
        }),
        contextNginxConf: hold(() => {
            return _self.contextDirectory().resolve('nginx.conf');
        }),
        contextDockerfile: hold(() => {
            return _self.contextDirectory().resolve('Dockerfile');
        }),
        contextNginxConfRelativePath: hold(() => {
            return _self.contextDirectory().relative(_self.contextNginxConf());
        }),
        azureTerraformer: hold(() => {
            return AzureTerraformer({});
        }),
        makeNginxConf: hold(async () => {
            await _self.azureTerraformer().createFileFromTemplate({
                template: _self.templateNginxConf(),
                destination: _self.contextNginxConf(),
                /** @type {import('.').Ipp5FrontendBuilder.NginxConfVariableMap} */
                map: {
                    containerAppPort: _options.containerAppPort().toString(),
                    backendApiHttpPathPrefix: _options.backendApiHttpPathPrefix(),
                    backendApiUrl: _options.backendApiUrl(),
                    backendBatchHttpPathPrefix: _options.backendBatchHttpPathPrefix(),
                    backendBatchUrl: _options.backendBatchUrl(),
                    backendIdpHttpPathPrefix: _options.backendIdpHttpPathPrefix(),
                    backendIdpUrl: _options.backendIdpUrl(),
                    backendStaticHttpPathPrefix: _options.backendStaticHttpPathPrefix(),
                    backendStaticUrl: _options.backendStaticUrl(),
                },
            });
        }),
        makeDockerfile: hold(async () => {
            await _self.azureTerraformer().createFileFromTemplate({
                template: _self.templateDockerfile(),
                destination: _self.contextDockerfile(),
                /** @type {import('.').Ipp5FrontendBuilder.DockerfileVariableMap} */
                map: {
                    containerAppGroup: _options.containerAppGroup(),
                    containerAppUser: _options.containerAppUser(),
                    containerAppEntrypoint: _options.containerAppEntrypoint(),
                    contextNginxConfRelativePath: _self.contextNginxConfRelativePath(),
                },
            });
        }),
        runDockerImageBuild: hold(async () => {
            await _self.azureTerraformer().dockerImageBuild({
                docker: _options.docker(),
                noCache: _options.noCache(),
                network: 'host',
                tag: _options.containerImageName(),
                context: _self.contextDirectory(),
            });
        }),
    });

    /** @type {import('.').Ipp5FrontendBuilder.Self} */
    const self = ({
        ...EventEmitter({}),
        _Ipp5FrontendBuilder: (() => {
            return _self;
        }),
        build: hold(async () => {
            await _self.makeNginxConf();
            await _self.makeDockerfile();
            await _self.runDockerImageBuild();
        }),
    });

    return self;

});

/** @type {import('.').Ipp5FrontendBuilder.Companion} */
const companion = ({});

/** @type {import('.').Ipp5FrontendBuilder.ConstructorWithCompanion} */
const constructorWithCompanion = Object.assign(constructor, companion);

export { constructorWithCompanion as Ipp5FrontendBuilder };
