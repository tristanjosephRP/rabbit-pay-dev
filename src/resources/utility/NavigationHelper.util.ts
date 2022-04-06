export class NavigationHelper {

  static getPath(path: string): string | undefined {
    return path.split('/')[1]
  }

  static isCurrentPath(path: string, currentPath: string): boolean {
    return currentPath === path
  }
}