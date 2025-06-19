// swift-tools-version:5.7
import PackageDescription

let package = Package(
    name: "IosApp",
    platforms: [
        .iOS(.v15)
    ],
    products: [
        .executable(name: "IosApp", targets: ["IosApp"])
    ],
    targets: [
        .executableTarget(
            name: "IosApp",
            path: "Sources/IosApp"
        )
    ]
)
