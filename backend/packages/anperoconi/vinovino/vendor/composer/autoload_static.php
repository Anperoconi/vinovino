<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit3e3d560bc9cee6815b304e71bc0ea498
{
    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'Anperoconi\\Vinovino\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Anperoconi\\Vinovino\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit3e3d560bc9cee6815b304e71bc0ea498::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit3e3d560bc9cee6815b304e71bc0ea498::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit3e3d560bc9cee6815b304e71bc0ea498::$classMap;

        }, null, ClassLoader::class);
    }
}
