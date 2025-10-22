{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    prisma-utils.url = "github:VanCoding/nix-prisma-utils";
  };

  outputs =
    { nixpkgs, prisma-utils, ... }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
      prisma =
        (prisma-utils.lib.prisma-factory {
          inherit pkgs;
          # just copy these hashes for now, and then change them when nix complains about the mismatch
          prisma-fmt-hash = "sha256-eGKy8W30blEY1izsOOhq95IjOtJmdS6m+st+AgnCf+A=";
          query-engine-hash = "sha256-PNIG/mQuc5qHTAwH1lbRQKtX2/dtBrKNeJunOAGus2s=";
          libquery-engine-hash = "sha256-Oq+YPmGRQK5Zop0WAl9KLH/sURdVZAWhX3/i+INVY38=";
          schema-engine-hash = "sha256-A0Pwhw9J83VlqdsTw6D+byUgkB45DIotR7lxFTh/Wv4=";
        }).fromNpmLock
          ./package-lock.json; # <--- path to our package-lock.json file that contains the version of prisma-engines
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        env = prisma.env;
        shellHook = "zsh";
        # or, you can use `shellHook` instead of `env` to load the same environment variables.
        # shellHook = prisma.shellHook;
      };
    };
}
