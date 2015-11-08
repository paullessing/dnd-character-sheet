module CharacterBuilder.Tabs {
    export class TabsDirectiveController {
        public tabs: string[] = [];
        private _activeTab: string = null;

        public addTab(title: string): number {
            if (this.tabs.indexOf(title) < 0) {
                this.tabs.push(title);
            }
            if (this.tabs.length === 1) {
                this.select(title);
            }
            return this.tabs.length - 1;
        }

        public select(title: string) {
            this._activeTab = title;
        }

        public isActive(tabTitle: string): boolean {
            return tabTitle === this._activeTab;
        }
    }
}