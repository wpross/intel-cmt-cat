/*BSD LICENSE

Copyright(c) 2022 Intel Corporation. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:
  * Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in
    the documentation and/or other materials provided with the
    distribution.
  * Neither the name of Intel Corporation nor the names of its
    contributors may be used to endorse or promote products derived
    from this software without specific prior written permission.
    
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/

import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';

import { SharedModule } from 'src/app/shared/shared.module';
import { CacheAllocation } from '../system-caps.model';
import { L3catComponent } from './l3cat.component';

describe('Given L3catComponent', () => {
  beforeEach(() => MockBuilder(L3catComponent).mock(SharedModule));

  MockInstance.scope('case');

  describe('when initialized', () => {
    it('should display "L3 CAT" title', () => {
      const mockedL3cat: CacheAllocation = {
        cache_size: 42,
        cdp_enabled: false,
        cdp_supported: false,
        clos_num: 15,
        cw_num: 12,
        cw_size: 3.5,
      };

      MockRender(L3catComponent, {
        isSupported: true,
        l3cat: mockedL3cat,
      });

      const expectValue = ngMocks.formatText(ngMocks.find('div'));

      expect(expectValue).toEqual('L3 CAT');
    });
  });

  describe('when initialized and L3CAT is supported', () => {
    it('should display L3 CAT details', () => {
      const mockedL3cat: CacheAllocation = {
        cache_size: 42,
        cdp_enabled: false,
        cdp_supported: false,
        clos_num: 15,
        cw_num: 12,
        cw_size: 3.5,
      };

      MockRender(L3catComponent, {
        isSupported: true,
        l3cat: mockedL3cat,
      });

      const template = ngMocks.findAll('span');
      const expextedData = ngMocks.formatText(template);

      expect(expextedData).toEqual([
        'Supported',
        'Yes',
        'Cache size',
        '42MB',
        'Cache way size',
        '3.5MB',
        'Number of cache ways',
        '12',
        'Number of COS',
        '15',
        'CDP supported',
        'No',
      ]);
    });

    it('should display "Supported Yes" text', () => {
      const mockedL3cat: CacheAllocation = {
        cache_size: 42,
        cdp_enabled: false,
        cdp_supported: false,
        clos_num: 15,
        cw_num: 12,
        cw_size: 3.5,
      };

      MockRender(L3catComponent, {
        isSupported: true,
        l3cat: mockedL3cat,
      });

      const template = ngMocks.formatText(ngMocks.find('.positive'));

      expect(template).toEqual('Yes');
    });
  });

  describe('when initialized and L3CAT is NOT supported', () => {
    it('should NOT display L3 CAT details', () => {
      const mockedL3cat: CacheAllocation = {
        cache_size: 42,
        cdp_enabled: false,
        cdp_supported: false,
        clos_num: 15,
        cw_num: 12,
        cw_size: 3.5,
      };

      MockRender(L3catComponent, {
        isSupported: false,
        l3cat: mockedL3cat,
      });

      const template = ngMocks.find('mat-list-item', null);

      expect(template).toBeNull();
    });

    it('should display "Supported No" text', () => {
      const mockedL3cat: CacheAllocation = {
        cache_size: 42,
        cdp_enabled: false,
        cdp_supported: false,
        clos_num: 15,
        cw_num: 12,
        cw_size: 3.5,
      };

      MockRender(L3catComponent, {
        isSupported: false,
        l3cat: mockedL3cat,
      });

      const template = ngMocks.formatText(ngMocks.find('.negative'));

      expect(template).toEqual('No');
    });
  });

  describe('when L3CAT CDP is supported', () => {
    it('should display "CDP enabled" toggle', () => {
      const mockedL3cat: CacheAllocation = {
        cache_size: 42,
        cdp_enabled: false,
        cdp_supported: true,
        clos_num: 15,
        cw_num: 12,
        cw_size: 3.5,
      };

      MockRender(L3catComponent, {
        isSupported: true,
        l3cat: mockedL3cat,
      });

      const template = ngMocks.find('mat-slide-toggle');

      expect(template).toBeTruthy();
    });
  });

  describe('when L3CAT CDP is NOT supported', () => {
    it('should NOT display "CDP enabled" toggle', () => {
      const mockedL3cat: CacheAllocation = {
        cache_size: 42,
        cdp_enabled: false,
        cdp_supported: false,
        clos_num: 15,
        cw_num: 12,
        cw_size: 3.5,
      };

      MockRender(L3catComponent, {
        isSupported: true,
        l3cat: mockedL3cat,
      });

      const template = ngMocks.find('mat-slide-toggle', null);

      expect(template).toBeNull();
    });
  });
});