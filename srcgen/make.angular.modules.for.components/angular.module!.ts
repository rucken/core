import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    <%=ComponentName%>Component
  ],
  exports: [
    <%=ComponentName%>Component
  ],
  entryComponents: [<%=ComponentName%>Component]
})
export class <%=ComponentName%>Module {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: <%=ComponentName%>Module,
      providers: []
    };
  }
}
